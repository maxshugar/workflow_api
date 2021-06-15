const BaseController = require('./baseController')
const userService = require('../services/userService');

function UserController(){
    BaseController.call(this, userService);
}
UserController.prototype = Object.create(BaseController.prototype);
UserController.prototype.constructor = UserController;

// // Override create user method.
// UserController.prototype.create = async (req, res) => {

// }

module.exports = new UserController(); 