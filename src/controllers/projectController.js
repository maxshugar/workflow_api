const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const { createAppAuth } = require("@octokit/auth-app");

const BaseController = require("./baseController");
const projectService = require("../services/projectService");

const pem = fs.readFileSync("./src/util/key.pem", "utf8");

function ProjectController() {
  BaseController.call(this, projectService);
}
ProjectController.prototype = Object.create(BaseController.prototype);
ProjectController.prototype.constructor = ProjectController;

ProjectController.prototype.create = async function (req, res) {
  const { _id, ownerId, elements } = req.body;
  // Authenticate using GitHub app.
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 121396,
      privateKey: pem,
      installationId: 17640069,
      clientId: "Iv1.d07d61517d00f1c6",
      clientSecret: "00fa390b293dd2113ea0f64fb2f5deaa8f7747d2",
    },
  });
  // Create repository in Sony UK organisation.
  // let ret = await appOctokit.rest.repos.createInOrg({
  //   org: "SonyUKTechnologyCenter",
  //   name: `processEngine_${_id}`,
  // });
  ret = await this._service.create({ _id, ownerId, elements });
  return res.json(ret);
};

module.exports = new ProjectController();

// const appOctokit = new Octokit({
//   authStrategy: createAppAuth,
//   auth: {
//     appId: 121396,
//     privateKey: pem,
//     installationId: 17640069,
//     clientId: 'Iv1.d07d61517d00f1c6',
//     clientSecret: "00fa390b293dd2113ea0f64fb2f5deaa8f7747d2"
//   },
// });
