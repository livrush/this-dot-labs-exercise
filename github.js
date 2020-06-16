require('dotenv').config();
const axios = require('axios');
const { GITHUB_API_TOKEN } = process.env;

const userInfoQuery = `
id
avatarUrl
bio
login
name
url
followers {
  totalCount
}
following {
  totalCount
}
repositories {
  totalCount
}
starredRepositories {
  totalCount
}
`

const GitHubRequestHandler = (req, res) => {
  const userQuery = `query SearchUsers($queryString: String!) {
    search(type: USER, query: $queryString, first: 12) {
      userCount
      nodes {
        ...on User {
          ${userInfoQuery}
        }
      }
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
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
    .then(response => response.data.search)
    .then(searchData => ({
      ...searchData,
      nodes: searchData.nodes.filter(node => node.id),
    }))
    .then(searchData => {
      res.send(searchData)
    })
    .catch(error => {console.error(error)});
};

const GitHubRequestPaginationHandler = (req, res) => {
  const userQuery = `query SearchUsers($queryString: String!, $after: String!) {
    search(type: USER, query: $queryString, first: 12, after: $after) {
      nodes {
        ...on User {
          ${userInfoQuery}
        }
      }
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
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
    .then(response => response.data.search)
    .then(searchData => ({
      ...searchData,
      nodes: searchData.nodes.filter(node => node.id),
    }))
    .then(searchData => {res.send(searchData)})
    .catch(error => {console.error(error)});
};

module.exports = {
  GitHubRequestHandler,
  GitHubRequestPaginationHandler,
};
