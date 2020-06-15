require('dotenv').config();
const axios = require('axios');
const { GITHUB_API_TOKEN } = process.env;

const GitHubRequestHandler = (req, res) => {
  axios.post('https://api.github.com/graphql', {}, {
    Authorization: `bearer ${GITHUB_API_TOKEN}`,
  })
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    })
};

module.exports = {
  GitHubRequestHandler,
};
