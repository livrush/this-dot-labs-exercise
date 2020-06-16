import React, { useState } from 'react';
import axios from 'axios';

import { UserList } from './components/UserList';
import { Pacifier } from './components/Pacifier';

function App() {
  const [pacifierVisible, setPacifierVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({});

  const reqUrlBase = 'http://localhost:4000/api/github/user';

  function initialSearch() {
    if (searchValue) {
      axios
      .get(`${reqUrlBase}/${searchValue}`)
      .then(res => res.data)
      .then(({
            nodes,
            pageInfo,
            userCount
          }) => {
        console.log(pageInfo);
        setUsers(nodes);
        setUserCount(userCount)
        setPaginationInfo(pageInfo)
      })
      .catch(console.error);
    }
  }

  function paginatedSearch({ before, after }) {
    let reqUrl = `${reqUrlBase}/${searchValue}`;
    if (before) {
      reqUrl = `${reqUrl}/before/${before}`;
    } else if (after) {
      reqUrl = `${reqUrl}/after/${after}`;
    }
    axios
      .get(reqUrl)
      .then(res => res.data)
      .then(({ nodes, pageInfo }) => {
        setUsers(nodes);
        setPaginationInfo(pageInfo)
      })
      .catch(console.error);
  }

  return (
    <div className="App bg-secondary container py-3">
      <h1 className="h1">GitHub Users Search</h1>
      <p>Enter a username to search for on GitHub</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username to search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={initialSearch}>
            Search
          </button>
        </div>
      </div>
      <Pacifier show={pacifierVisible} />
      <UserList users={users} count={userCount} />
      {
        users.length ?
        (
          <div className="mt-2 btn-group">
            <button
              className="btn btn-primary"
              onClick={() => paginatedSearch({before: paginationInfo.startCursor})}
              disabled={!paginationInfo.hasPreviousPage}
            >
              Prev Page
            </button>
            <button
              className="btn btn-primary"
              onClick={() => paginatedSearch({after: paginationInfo.endCursor})}
              disabled={!paginationInfo.hasNextPage}
            >
              Next Page
            </button>
          </div>
        ) :
        null
      }
    </div>
  );
}

export default App;
