function BaseService(model) {
    this.model_ = model;
}
BaseService.prototype.getAll = async function () {
    return new Promise(resolve => {
        this.model_.find({}).exec()
        .then(res => {
            resolve({ ok: true, msg: res });
        }).catch(err => {
            resolve({ ok: false, err });
        })
    })
}
BaseService.prototype.get = async function (id) {
    return new Promise(resolve => {
        return this.model_.findById(id).exec()
        .then(res => {
            resolve({ ok: true, msg: res });
        }).catch(err => {
            resolve({ ok: false, err });
        })
    })
}
BaseService.prototype.create = async function (model) {
    return new Promise(resolve => {
        const newModel = new this.model_(model);
        newModel.save()
        .then(res => {
            resolve({ ok: true, msg: res });
        }).catch(err => {
            resolve({ ok: false, err });
        })
    })
}
BaseService.prototype.update = async function (model) {
    return new Promise(resolve => {
        this.model_.updateOne(model).exec()
        .then(res => {
            resolve({ ok: true, msg: res });
        }).catch(err => {
            resolve({ ok: false, err });
        })
    })
}
BaseService.prototype.delete = async function (id) {
    return new Promise(resolve => {
        this.model_.findByIdAndDelete(id).exec()
        .then(res => {
            resolve({ ok: true, msg: res });
        }).catch(err => {
            resolve({ ok: false, err });
        })
    })
}

module.exports = BaseService;