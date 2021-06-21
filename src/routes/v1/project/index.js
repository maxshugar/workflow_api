const express = require("express");
const router = express.Router();
const ProjectController = require('../../../controllers/projectController');

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

router.get("/", (req, res) => ProjectController.getAll(req, res));
router.get("/:id", (req, res) => ProjectController.get(req, res));
router.post("/", (req, res) => ProjectController.create(req, res));
router.put("/:id", (req, res) => ProjectController.update(req, res));
router.delete("/:id", (req, res) => ProjectController.delete(req, res));
module.exports = router;