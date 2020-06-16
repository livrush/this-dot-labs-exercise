require('dotenv').config();
const {
  PORT,
} = process.env;

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT || 3000, () =>
  console.log(`Client server listening at http://localhost:${PORT || 3000}`),
);