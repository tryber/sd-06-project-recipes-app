import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const [Sbar, setSbar] = useState(false);

  function handleSearch() {
    setSbar(!Sbar);
    localStorage.setItem('sbar', Sbar);
  }

  const { title } = props;

  const searchButton = (
    (title === 'Comidas' || title === 'Bebidas'
      ? (
        <button
          type="button"
          name="search"
          className="btn-search"
          onClick={ handleSearch }
        >
          <img
            src={ searchIcon }
            alt="search"
            className="icon-search"
            data-testid="search-top-btn"
          />
        </button>
      )
      : (
        <button
          type="button"
          name="search"
          className="btn-search-hide"
          onClick={ handleSearch }
        >
          <img
            src={ searchIcon }
            alt="search"
            className="icon-search"
            data-testid="search-top-btn"
          />
        </button>
      )
    ));

  return (
    <div className="nav-bar">
      <div className="header">
        <Link to="/perfil" data-testid="profile-top-btn" src={ profileIcon }>
          <img src={ profileIcon } alt="profile" className="perfil-icon" />
        </Link>
        <h2 className="header-title" data-testid="page-title">{ title }</h2>
        {searchButton}
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
