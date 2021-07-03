function BaseService(model) {
  this.model_ = model;
}
BaseService.prototype.getAll = async function () {
  return new Promise((resolve) => {
    this.model_
      .find({})
      .exec()
      .then((res) => {
        resolve({ ok: true, msg: res });
      })
      .catch((err) => {
        resolve({ ok: false, err });
      });
  });
};
BaseService.prototype.get = async function (id) {
  return new Promise((resolve) => {
    return this.model_
      .findById(id)
      .exec()
      .then((res) => {
        const { collaboratorIds, elements, _id: id, ownerId } = res;

        resolve({ ok: true, msg: { collaboratorIds, elements, id, ownerId } });
      })
      .catch((err) => {
        resolve({ ok: false, err });
      });
  });
};
BaseService.prototype.create = async function (model) {
  return new Promise((resolve) => {
    const newModel = new this.model_(model);
    newModel
      .save()
      .then((res) => {
        resolve({ ok: true, msg: res });
      })
      .catch((err) => {
        resolve({ ok: false, err });
      });
  });
};
BaseService.prototype.update = async function (model) {
  let { collaboratorIds, elements, id, ownerId } = model;
  return new Promise((resolve) => {
    this.model_
      .findByIdAndUpdate(id, { collaboratorIds, elements, ownerId })
      .exec()
      .then((res) => {
 
        

        let { collaboratorIds, elements, _id: id, ownerId } = res;

        console.log(JSON.parse(elements))

        resolve({
          ok: true,
          msg: { collaboratorIds, elements, id, ownerId },
        });
      })
      .catch((err) => {
        resolve({ ok: false, err });
      });
  }); 
};
BaseService.prototype.delete = async function (id) {
  return new Promise((resolve) => {
    this.model_
      .findByIdAndDelete(id)
      .exec()
      .then((res) => {
        resolve({ ok: true, msg: res });
      })
      .catch((err) => {
        resolve({ ok: false, err });
      });
  });
};

module.exports = BaseService;
