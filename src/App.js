import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
    <div className="App bg-secondary container">
      <h1 className="h1">GitHub Users Search</h1>
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
      <div className="input-group mb-3">
        <p>Viewing {users.length} of {userCount} total results:</p>
      </div>

      <div className="row">
      {users.map((user) => (
        <div key={user.id} className="col-6 col-sm-3 col-md-2">
        <div className="card mb-2">
          <img src={user.avatarUrl} className="card-img-top" alt={user.login} />
          <div className="card-body">
            <h5 className="card-title">
              {user.login}
            </h5>
          </div>
        </div>
        </div>
      ))}
      </div>
      {
        users.length ?
        (
          <button
            className="btn btn-primary"
            onClick={paginatedSearch}
          >
            View More Users
          </button>
        ) :
        null
      }
    </div>
  );
}

export default App;
