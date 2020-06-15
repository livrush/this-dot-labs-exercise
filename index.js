require('dotenv').config();

const express = require('express');
var bodyParser = require('body-parser');
const {
  PORT_SERVER,
} = process.env;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/api/github/users', (req, res) => res.send('Hello World!'));

app.listen(PORT_SERVER || 4000, () =>
  console.log(`API server listening at http://localhost:${PORT_SERVER || 4000}`),
);
