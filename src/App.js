import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCursor, setUserCursor] = useState('');

  function initialSearch() {
    axios.get(`https://localhost:4000/api/github/user/${searchValue}`)
      .then(console.log);
  }

  return (
    <div className="App bg-secondary container">
      <h1 className="h1">GitHub Users Search</h1>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Username to search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" onClick={initialSearch}>
            Search
          </button>
        </div>
      </div>
      {users.map((user) => (
        <div key={user.id}>{user.login}</div>
      ))}
    </div>
  );
}

export default App;
