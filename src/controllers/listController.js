const { request, response } = require("express");


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
function listController(req, res) {
    console.log(req.body);
    res.send("hello");
}

module.exports = listController;