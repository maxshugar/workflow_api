const express = require("express");
const { gitClientId, gitClientSecret, gitRedirectUri } = require("../../util/config");
const router = express.Router({ mergeParams: true });

const fetch = require("node-fetch");


const user = require("./user");
const { json } = require("express");

router.use("/user", user);

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post("/authenticate", async (req, res) => {
    const { code } = req.body;
    
    const data = {
        client_id: gitClientId,
        client_secret: gitClientSecret,
        code,
        redirect_uri: gitRedirectUri
    };
    console.log(data) 
    //return res.status(400).json("");
    // Request to exchange code for an access token
    fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      }
    })
      .then((response) => response.text())
      .then((paramsString) => {
        const {access_token} = JSON.parse(paramsString);
        //   console.log(paramsString)
        // let params = new URLSearchParams(paramsString);
        // const access_token = params.get("access_token");
        // Request to return data of a user that has been authenticated
        return fetch(`https://api.github.com/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          }, 
        }); 
      })
      .then((response) => response.json())
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
}); 

module.exports = router;