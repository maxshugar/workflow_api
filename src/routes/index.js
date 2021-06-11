const express = require("express");
const router = express.Router({ mergeParams: true });
const { api: { basePath } } = require('../util/config');
router.use(basePath, require(`./${basePath}`));
module.exports = router;