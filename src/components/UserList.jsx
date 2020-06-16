import React from 'react';
import { UserCard } from './UserCard';

const UserList = ({ users, count }) => {
  if (!users.length) {
    return (
      <p className="empty text-center">
        No users to show! Try a new search.
      </p>
    )
  }
  return (
    <div className="user-list">
      {users.length ? (
        <div className="input-group mb-3">
          <p>
            Viewing {users.length} of {count} total results:
          </p>
        </div>
      ) : null}
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-12 col-sm-4 col-sm-3">
            <UserCard info={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { UserList };
