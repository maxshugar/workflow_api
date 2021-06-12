const express = require("express");
const router = express.Router();
const ProjectController = require('../../../controllers/projectController');

router.get("/", (req, res) => ProjectController.getAll(req, res));
router.get("/:id", (req, res) => ProjectController.get(req, res));
router.post("/", (req, res) => ProjectController.create(req, res));
router.put("/:id", (req, res) => ProjectController.update(req, res));
router.delete("/:id", (req, res) => ProjectController.delete(req, res));
module.exports = router;