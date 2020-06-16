require('dotenv').config();
var cors = require('cors');
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const {
  PORT,
} = process.env;

const {
  GitHubRequestHandler,
  GitHubRequestPaginationHandler,
} = require('./api/github.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/github/user/:username', GitHubRequestHandler);

app.get('/api/github/user/:username/after/:after', GitHubRequestPaginationHandler);
app.get('/api/github/user/:username/before/:before', GitHubRequestPaginationHandler);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT || 3000, () =>
  console.log(`Client server listening at http://localhost:${PORT || 3000}`),
);
