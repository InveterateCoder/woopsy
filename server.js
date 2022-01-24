const app = require('express')();
const htmlRouter = require("./src/routing/html");
const apiRouter = require("./src/routing/api");

app.set("view engine", "ejs");

app.use("/", htmlRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log("server has started on port " + port));