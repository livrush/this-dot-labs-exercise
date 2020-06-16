import React, { useState } from 'react';
import axios from 'axios';

import { UserCard } from './components/UserCard';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({});

  const reqUrl = 'http://localhost:4000/api/github/user';

  function initialSearch() {
    if (searchValue) {
      axios
      .get(`${reqUrl}/${searchValue}`)
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

  function paginatedSearch() {
    axios
      .get(`${reqUrl}/${searchValue}/cursor/${paginationInfo.endCursor}`)
      .then(res => res.data)
      .then(({ nodes, pageInfo }) => {
        setUsers([...users, ...nodes]);
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
      {
        users.length ?
        (
        <div className="input-group mb-3">
          <p>Viewing {users.length} of {userCount} total results:</p>
        </div>
        ) :
        null
      }
      <div className="row">
      {users.map((user) => (
        <div key={user.id} className="col-12 col-sm-4 col-sm-3">
          <UserCard info={user} />
        </div>
      ))}
      </div>
      {
        users.length ?
        (
          <div className="mt-2 btn-group">
            <button
              className="btn btn-primary"
              onClick={paginatedSearch}
              disabled={!paginationInfo.hasPreviousPage}
            >
              Prev Page
            </button>
            <button
              className="btn btn-primary"
              onClick={paginatedSearch}
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
