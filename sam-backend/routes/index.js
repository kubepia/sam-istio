var express = require("express");
var debug = require("debug")("sam-backend:");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    let version = "v1";
    if ("v2" == process.env.VERSION) {
        version = "v2";
    }
    debug(version);
    res.json({
        value: `This is version : ${version}`
    });
});
router.get("/health", function(req, res, next) {
    res.status(200)
        .type("html")
        .send("ok");
});

module.exports = router;
