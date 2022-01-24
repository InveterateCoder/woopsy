const { Client } = require("pg");

const client = new Client(process.env.POSTGRES_CONNECTION_URL);
const connect = client.connect();

async function getDb() {
    await connect;
    return client;
}

module.exports = { getDb }