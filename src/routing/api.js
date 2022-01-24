const router = require("express").Router();


router.get("/", async (_, res) => {
    res.send("Test API by Arthur G");
});

module.exports = router;