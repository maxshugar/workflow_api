const BaseController = require('./base_controller')
const userService = require('../services/user');

function UserController(){
    BaseController.call(this, userService);
}
UserController.prototype = Object.create(BaseController.prototype);
UserController.prototype.constructor = UserController;

// // Override create user method.
// UserController.prototype.create = async (req, res) => {

// }

module.exports = new UserController(); 