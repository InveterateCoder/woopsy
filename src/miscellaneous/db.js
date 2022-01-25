const { Client } = require("pg");

const client = new Client(process.env.POSTGRES_CONNECTION_URL);
const connect = client.connect();

async function getDb() {
    await connect;
    return client;
}

async function initializeDb() {
    const db = await getDb();
    try {
        await db.query(
            `CREATE TABLE users (
                id INT UNIQUE,
                email VARCHAR(100) UNIQUE,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                avatar TEXT
            );`
        )
    } catch(err) {
        if(err.code !== "42P07") {
            throw err;
        }
    }
}

module.exports = { getDb, initializeDb }