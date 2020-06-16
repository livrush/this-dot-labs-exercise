import React, { useState } from 'react';
import axios from 'axios';

import { UserCard } from './components/UserCard';

function App() {
  const [searchValue, setSearchValue] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [userCursor, setUserCursor] = useState('');

  function initialSearch() {
    if (searchValue) {
      axios
      .get(`http://localhost:4000/api/github/user/${searchValue}`)
      .then(res => res.data)
      .then(({
            nodes,
            pageInfo,
            userCount
          }) => {
        setUsers(nodes);
        setUserCount(userCount)
        setUserCursor(pageInfo.endCursor);
      })
      .catch(console.error);
    }
  }

  function paginatedSearch() {
    axios
      .get(`http://localhost:4000/api/github/user/${searchValue}/cursor/${userCursor}`)
      .then(res => res.data)
      .then(({ nodes, pageInfo }) => {
        setUsers([...users, ...nodes]);
        setUserCursor(pageInfo.endCursor);
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
        <div key={user.id} className="col-6 col-sm-4 col-sm-3">
          <UserCard info={user} />
        </div>
      ))}
      </div>
      {
        users.length ?
        (
          <div className="mt-2">
            <button
              className="btn btn-primary"
              onClick={paginatedSearch}
            >
              View More Users
            </button>
            <button
              className="btn btn-secondary"
              // onClick={paginatedSearch}
            >
              Scroll to Top
            </button>
          </div>
        ) :
        null
      }
    </div>
  );
}

export default App;
