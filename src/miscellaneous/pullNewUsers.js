const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const { getDb } = require("./db");
const format = require("pg-format");


const settingsFile = path.resolve(__dirname, "pullNewUsers.dat");


// getting current pulling page and last-saved id
async function getSettings() {
    return await new Promise((resolve, reject) => {
        fs.readFile(settingsFile, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                if (err.code === "ENOENT")
                    resolve([1, 0]);
                else reject(err);
            } else if (data) {
                resolve(JSON.parse(data));
            } else {
                reject(new Error(`wrong data at ${settingsFile}`));
            }
        });
    });
}

// saving current pulling page and last-saved id
// filesystem has been chosen for simplicity but might be not the best option in production
async function saveNewSettings(page, id) {
    return await new Promise((resolve, reject) => {
        fs.writeFile(
            settingsFile,
            JSON.stringify([page, id]),
            { encoding: "utf-8", flag: "w" },
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

// poll new users according to last processed state and if there are new users saves to db
async function pullNewUsers() {
    const [currentPage, lastSavedId] = await getSettings(),
        users = [];
    console.log(`trying to pull data with currentPage: ${currentPage}, lastSavedId: ${lastSavedId}`);
    async function pull(page) {
        return await (await axios.get(`https://reqres.in/api/users?page=${page}`)).data;
    }
    const { total_pages, data } = await pull(currentPage);
    users.push(...data.filter(user => user.id > lastSavedId));
    for (let page = currentPage + 1; page <= total_pages; page++) {
        users.push(...(await pull(page)).data);
    }

    if (users.length) {
        const db = await getDb();
        await db.query(format(
            `INSERT INTO users (id, email, first_name, last_name, avatar) VALUES %L`,
            users.map(Object.values),
        ));
        const newLastSavedId = users[users.length - 1].id;
        if (total_pages > currentPage || newLastSavedId > lastSavedId)
            await saveNewSettings(total_pages, newLastSavedId)
    }

    console.log(`new users received: `, users);
}

module.exports = pullNewUsers;