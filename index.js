require('dotenv').config();
var cors = require('cors');
const express = require('express');
var bodyParser = require('body-parser');
const {
  PORT_SERVER,
} = process.env;

const {
  GitHubRequestHandler,
  GitHubRequestPaginationHandler,
} = require('./github.js');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/api/github/user', GitHubRequestHandler);
app.get('/api/github/user/:username', GitHubRequestHandler);

app.get('/api/github/user/:username/cursor/:cursor', GitHubRequestPaginationHandler);

app.listen(PORT_SERVER || 4000, () =>
  console.log(`API server listening at http://localhost:${PORT_SERVER || 4000}`),
);
