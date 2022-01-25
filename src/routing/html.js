const router = require("express").Router();


router
    .get("/", (_, res) => {
        res.render("pages/index");
    })
    .get("/about", (_, res) => {
        res.render("pages/about");
    });

module.exports = router;