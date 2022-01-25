require("dotenv").config();
const schedule = require("node-schedule");
const app = require('express')();
const htmlRouter = require("./src/routing/html");
const apiRouter = require("./src/routing/api");
const pullNewUsers = require("./src/miscellaneous/pullNewUsers");

pullNewUsers();
schedule.scheduleJob("*/1 * * * *", pullNewUsers);


app.set("view engine", "ejs");

app.use("/", htmlRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log("server has started on port " + port));