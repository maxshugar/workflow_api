// Conversion to ES5 class to support singleton design pattern.
function BaseController(service){
    this._service = service;
}
BaseController.prototype.getAll = async function(req, res){
    const ret = await this._service.getAll()
    return res.json(ret);
}
BaseController.prototype.get = async function(req, res){
    const id = req.params.id;
    const ret = await this._service.get(id)
    return res.json(ret);
}
BaseController.prototype.create = async function(req, res){
    const model = req.body;
    const ret = await this._service.create(model)
    return res.json(ret);
}
BaseController.prototype.update = async function(req, res){
    const model = req.body;
    const ret = await this._service.update(model)
    return res.json(ret);
}
BaseController.prototype.delete = async function(req, res){
    const id = req.params.id;
    const ret = await this._service.delete(id)
    return res.json(ret);
}
module.exports = BaseController;