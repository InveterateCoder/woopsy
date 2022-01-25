const router = require("express").Router();
const listController = require("../controllers/listController");


router
    .get("/", async (_, res) => {
        res.send("Test API by Arthur G");
    })
    .post("/list", listController);

module.exports = router;