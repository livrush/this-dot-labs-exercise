require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const {
  PORT_SERVER,
} = process.env;

const {
  GitHubRequestHandler
} = require('./github.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/github/users', GitHubRequestHandler);

app.listen(PORT_SERVER || 4000, () =>
  console.log(`API server listening at http://localhost:${PORT_SERVER || 4000}`),
);
