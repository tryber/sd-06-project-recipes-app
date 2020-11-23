import React from 'react';

function Header({ name }) {
  return (
    <div>
      <button className="logo-profile" data-testid="profile-top-btn">profile-icon</button>
      <h1 data-testid="page-title">{name}</h1>
      <button className="logo-search" data-testid="search-top-btn">search-icon</button>
    </div>
  );
}

export default Header;
