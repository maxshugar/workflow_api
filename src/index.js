require('./util/mongo');
const { api: { port } } = require('./util/config');
const routes = require(`./routes`);
const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use('/', routes);

app.use(cors())
app.use(express.urlencoded());

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port, () => {
  console.log(`Process Engine API is listening on port: ${port}.`);
}); 