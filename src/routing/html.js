const router = require("express").Router();


router.get("/", (_, res) => {
    res.render("pages/index");
});

router.get("/about", (_, res) => {
    res.render("pages/about");
});

module.exports = router;