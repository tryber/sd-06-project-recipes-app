import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../styles/images/profileIcon.svg';
import searchIcon from '../styles/images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';
import '../styles/Header.css';

function Header({ name, button }) {
  const [searchHeader, setSearchHeader] = useState(false);

  const isClick = () => {
    if (searchHeader) {
      setSearchHeader(false);
    } else {
      setSearchHeader(true);
    }
  };

  return (
    <div data-testid="header" className="div-body">
      <header className="header">
        <Link to="/perfil">
          <button type="button" className="logo-profile-btn">
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
        </Link>
        <h1 data-testid="page-title">{name}</h1>
        { button && (
          <button
            type="button"
            className="logo-search-btn"
            onClick={ isClick }
          >
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
        )}

      </header>
      {searchHeader && <HeaderSearch name={ name } />}
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  button: PropTypes.bool.isRequired,
};

export default Header;
