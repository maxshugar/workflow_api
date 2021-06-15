const express = require("express");
const router = express.Router({ mergeParams: true });
const { api: { basePath } } = require('../util/config');

router.use("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(basePath, require(`./${basePath}`));
module.exports = router;