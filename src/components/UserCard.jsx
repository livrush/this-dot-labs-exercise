import React from 'react';

const UserCard = ({ info }) => {
  if (!info.id) {
    return null;
  }
  return (
    <div className="card mb-4">
      <img src={info.avatarUrl} className="card-img-top" alt={info.login} />
      <div className="card-body">
        <a href={info.url} target="_blank" rel="noopener noreferrer">
          <h5 className="card-title">{info.login}</h5>
        </a>
        <p className="font-weight-bold">{info.name}</p>
        <p>{info.bio}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a
            href={`${info.url}?tab=repositories`}
            className="d-flex justify-content-between"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Repositories:</span>
            <span>{info.repositories.totalCount}</span>
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${info.url}?tab=followers`}
            className="d-flex justify-content-between"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Followers:</span>
            <span>{info.followers.totalCount}</span>
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${info.url}?tab=following`}
            className="d-flex justify-content-between"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Following:</span>
            <span>{info.following.totalCount}</span>
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={`${info.url}?tab=stars`}
            className="d-flex justify-content-between"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Starred Repositories:</span>
            <span>{info.starredRepositories.totalCount}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
export { UserCard };

