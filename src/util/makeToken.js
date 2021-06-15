const { createAppAuth } = require('@octokit/auth-app');
const fs = require('fs');

// Replace with the path to your private key file
const pem = fs.readFileSync('./key.pem', 'utf8');

// This function creates a JWT that you can use with
// Axios or any other HTTP client to make requests to
// GitHub as your app.
module.exports = createJWT = async (installationId) => {
  const auth = createAppAuth({
    id: '121396',
    privateKey: pem,
    installationId,
    clientId: 'Iv1.d07d61517d00f1c6',
    clientSecret: "00fa390b293dd2113ea0f64fb2f5deaa8f7747d2"
  });

  const { token } = await auth({ type: 'installation' });
  return token;
}