const BaseService = require('./base_service');
const userModel = require('../models/user');

function UserService(){
    BaseService.call(this, userModel);
}
UserService.prototype = Object.create(BaseService.prototype);
UserService.prototype.constructor = UserService;

// Override create user method.
// UserService.prototype.create = async () => {

// }

module.exports = new UserService();