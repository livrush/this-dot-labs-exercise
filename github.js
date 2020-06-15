require('dotenv').config();
const axios = require('axios');
const { GITHUB_API_TOKEN } = process.env;

const GitHubRequestHandler = (req, res) => {
  const userQuery = `query SearchUsers($queryString: String!) {
    search(type: USER, query: $queryString, first: 10) {
      nodes {
        ...on User {
          id
          login
        }
      }
    }
  }`;

  axios.post('https://api.github.com/graphql', {
    query: userQuery,
    variables: {
      "queryString": `${req.query.username} in:login`
    },
  }, {
    headers: {
      Authorization: `bearer ${GITHUB_API_TOKEN}`,
    }
  })
    .then(response => response.data)
    .then(response => {res.send(response)})
    .catch(error => {console.error(error)});
};

module.exports = {
  GitHubRequestHandler,
};
