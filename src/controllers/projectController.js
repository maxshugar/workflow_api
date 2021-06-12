const BaseController = require('./base_controller')
const projectService = require('../services/project');

function ProjectController(){
    BaseController.call(this, userService);
}
ProjectController.prototype = Object.create(BaseController.prototype);
ProjectController.prototype.constructor = UserController;

// // Override create user method.
// UserController.prototype.create = async (req, res) => {

// }

module.exports = new ProjectController(); 