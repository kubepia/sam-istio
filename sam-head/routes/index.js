var express = require("express");
var router = express.Router();

// remote call
const Agent = require("agentkeepalive");
const keepAliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

let _axios = require("axios");
const axios = _axios.create({ httpAgent: keepAliveAgent });
// end

router.get("/health", function(req, res, next) {
    res.status(200)
        .type("html")
        .send("ok");
});

/* GET home page. */
router.get("/", function(req, res, next) {
    res.send("This is head app");
});

router.get("/call/:svc/:port/:value", function(req, res, next) {
    /**
     * remote call block
     */
    if ('v2'==req.params.value) {
        header = { membership: "vip" };
    } else {
        header = axios.defaults.headers.common;
    }
    axios
        .get(`http://${req.params.svc}:${req.params.port}`, {
            headers: header
        })
        .then(response => {
            let data = response.data;
            res.status(200).json({
                call: `service: ${req.params.svc} port: ${req.params.port} version:${req.params.value}`,
                ...data
            });
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            res.status(500).json(error);
        });
    // end
});

module.exports = router;
