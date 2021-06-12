const BaseService = require('./base_service');
const projectModel = require('../models/project');

function ProjectService(){
    BaseService.call(this, projectModel);
}
ProjectService.prototype = Object.create(BaseService.prototype);
ProjectService.prototype.constructor = UserService;

// Override create user method.
// UserService.prototype.create = async () => {

// }

module.exports = new ProjectService();