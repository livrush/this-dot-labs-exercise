require('dotenv').config();
const axios = require('axios');
const { GITHUB_API_TOKEN } = process.env;

const GitHubRequestHandler = (req, res) => {
  console.log('General request')
  const userQuery = `query SearchUsers($queryString: String!) {
    search(type: USER, query: $queryString, first: 12) {
      userCount
      nodes {
        ...on User {
          id
          avatarUrl
          login
          url
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`;

  axios.post('https://api.github.com/graphql', {
    query: userQuery,
    variables: {
      queryString: `${req.params.username} in:login`,
    },
  }, {
    headers: {
      Authorization: `bearer ${GITHUB_API_TOKEN}`,
    }
  })
    .then(response => response.data)
    .then(response => {res.send(response.data.search)})
    .catch(error => {console.error(error)});
};

const GitHubRequestPaginationHandler = (req, res) => {
  console.log('Pagination request')
  const userQuery = `query SearchUsers($queryString: String!, $after: String!) {
    search(type: USER, query: $queryString, first: 12, after: $after) {
      nodes {
        ...on User {
          id
          avatarUrl
          login
          url
        }
      }
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
    }
  }`;

  axios.post('https://api.github.com/graphql', {
    query: userQuery,
    variables: {
      queryString: `${req.params.username} in:login`,
      after: req.params.cursor,
    },
  }, {
    headers: {
      Authorization: `bearer ${GITHUB_API_TOKEN}`,
    }
  })
    .then(response => response.data)
    .then(response => {res.send(response.data.search)})
    .catch(error => {console.error(error)});
};

module.exports = {
  GitHubRequestHandler,
  GitHubRequestPaginationHandler,
};
