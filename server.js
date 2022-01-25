require("dotenv").config();
const schedule = require("node-schedule");
const pullNewUsers = require("./src/miscellaneous/pullNewUsers");
const { initializeDb } = require("./src/miscellaneous/db");
const express = require('express');
const htmlRouter = require("./src/routing/html");
const apiRouter = require("./src/routing/api");

initializeDb();

pullNewUsers();
schedule.scheduleJob("*/1 * * * *", pullNewUsers);

const port = process.env.PORT || 5002;
express()
    .use(express.json())
    .set("view engine", "ejs")
    .use("/", htmlRouter)
    .use("/api", apiRouter)
    .listen(port, () => console.log("server has started on port " + port));