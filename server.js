const app = require('express')();

app.set("view engine", "ejs");

app.get("/", (_, res) => {
    res.render("pages/index");
});

app.get("/about", (_, res) => {
    res.render("pages/about");
})

const port = process.env.PORT || 5002;
app.listen(port, () => console.log("server has started on port " + port));