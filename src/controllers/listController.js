const { request, response } = require("express");
const { getDb } = require("../miscellaneous/db");


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function listController(req, res) {
    let { name } = req.body;
    if (typeof name !== "string")
        return res.status(400).json({ list: [], error: "name should be a string" });
    name = name.trim();
    if (!name) return res.json({ list: [] });
    const words = name.split(/\s/).filter(w => w);

    const db = await getDb();
    const { rowCount, rows } = await db.query(
        `
            SELECT first_name, last_name FROM users
            WHERE ${words.map(
            word => ["first_name", "last_name"].map(
                rowName => `LOWER(${rowName}) LIKE '%${word.toLowerCase()}%'`)
                .join(" OR "))
            .join(" OR ")};
        `);
    if (rowCount === 0) return res.json({ list: [] });
    res.json({ list: rows.map(item => Object.values(item).join(" ")) });
}

module.exports = listController;