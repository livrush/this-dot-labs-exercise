import React from 'react';

const UserCard = ({ info }) => {
  console.log(info);
  if (!info.id) {
    return null;
  }
  return (
  <div className="card mb-4">
    <img src={info.avatarUrl} className="card-img-top" alt={info.login} />
    <div className="card-body">
      <h5 className="card-title">{info.login}</h5>
      <p>
        {info.bio}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between">
        <span>
          Repositories:
        </span>
        <span>
          {info.repositories.totalCount}
        </span>
        </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>
          Followers:
        </span>
        <span>
          {info.followers.totalCount}
        </span>
        </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>
          Following:
        </span>
        <span>
          {info.following.totalCount}
        </span>
        </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>
          Starred Repositories:
        </span>
        <span>
          {info.starredRepositories.totalCount}
        </span>
        </li>
    </ul>
  </div>
);
}
export { UserCard };

