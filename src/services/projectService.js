const BaseService = require('./baseService');
const projectModel = require('../models/project');

function ProjectService(){
    BaseService.call(this, projectModel);
}
ProjectService.prototype = Object.create(BaseService.prototype);
ProjectService.prototype.constructor = ProjectService;

// Override update project method.
ProjectService.prototype.update = async function (model) {
  let { collaboratorIds, elements, id, ownerId } = model;
  console.log(id)
  return new Promise((resolve) => {
    this.model_
      .findByIdAndUpdate(id, { collaboratorIds, elements, ownerId })
      .exec()
      .then((res) => {
 
        

        let { collaboratorIds, elements, _id: id, ownerId } = res;

        //console.log(JSON.parse(elements))
 
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
 
  ProjectService.prototype.get = async function (id) {
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

module.exports = new ProjectService();