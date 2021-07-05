const express = require("express");
const {
  gitClientId,
  gitClientSecret,
  gitRedirectUri,
} = require("../../util/config");
const router = express.Router({ mergeParams: true });

const fetch = require("node-fetch");

const user = require("./user");
const project = require("./project");
const userService = require("../../services/userService");

router.use("/user", user);
router.use("/project", project);

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// router.post("/authenticate", async (req, res) => {
//   const { code } = req.body;
//   console.log('auth called')
//   const data = {
//     client_id: gitClientId,
//     client_secret: gitClientSecret,
//     code,
//     redirect_uri: gitRedirectUri,
//   };
//   let accessToken = null;
//   //return res.status(400).json("");
//   // Request to exchange code for an access token
//   fetch(`https://github.com/login/oauth/access_token`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json",
//     },
//   })
//     .then((response) => response.text())
//     .then((paramsString) => {
//       accessToken = JSON.parse(paramsString).access_token;
//       console.log(accessToken)
//       //   console.log(paramsString)
//       // let params = new URLSearchParams(paramsString);
//       // const access_token = params.get("access_token");
//       // Request to return data of a user that has been authenticated
//       return fetch(`https://api.github.com/user`, {
//         headers: {
//           Authorization: `token ${accessToken}`,
//         },
//       });
//     })
//     .then((response) => response.json())
//     .then(async (response) => {
//       // Check if user exists, create if not.
//       let _res = await userService.get(response.login);
//       if (_res.ok) {
//         if (!_res.msg) _res = await userService.create({ _id: response.login });
//       }
//       response['accessToken'] = accessToken;
//       return res.status(200).json(response);
//     })
//     .catch((error) => {
//       return res.status(400).json(error);
//     });
// });

router.post("/authenticate", async (req, res) => {
  const data = { client_id: gitClientId, client_secret: gitClientSecret,
    code: req.body.code, redirect_uri: gitRedirectUri };
  let accessToken = null;
  fetch(`https://github.com/login/oauth/access_token`, { 
    method: "POST", body: JSON.stringify(data),
    headers: { Accept: "application/json", "Content-type": "application/json" }})
    .then((response) => response.text())
    .then((paramsString) => {
      accessToken = JSON.parse(paramsString).access_token;
      return fetch(`https://api.github.com/user`, {
        headers: { Authorization: `token ${accessToken}` }
      });
    })
    .then((response) => response.json())
    .then(async (response) => {
      let _res = await userService.get(response.login);
      if (_res.ok) { 
        if (!_res.msg) _res = await userService.create({ _id: response.login }); 
      }
      response['accessToken'] = accessToken;
      return res.status(200).json(response);
    })
    .catch((error) => { return res.status(400).json(error); });
});

module.exports = router;
