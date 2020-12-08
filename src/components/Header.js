import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/Header.css';
import SearchBar from './SearchBar';

function Header({ pageTitle, searchAbled }) {
  const [searchBarStatus, setSeachBarStatus] = useState(false);

  const handleSearchBar = () => {
    if (searchBarStatus) {
      return <SearchBar />;
    }
  };

  const handleSearchBarStatus = () => {
    if (searchBarStatus) {
      setSeachBarStatus(false);
    } else {
      setSeachBarStatus(true);
    }
  };

  const handleSearchIcon = () => {
    if (searchAbled) {
      const searchButton = (
        <button
          className="header-btn"
          type="button"
          onClick={ handleSearchBarStatus }
        >
          <img
            alt="search"
            data-testid="search-top-btn"
            src={ searchIcon }
          />
        </button>
      );
      return searchButton;
    }
    return null;
  };

  return (
    <div>
      <header>
        <button
          className="header-btn"
          type="button"
        >
          <Link to="/perfil">
            <img
              alt="profile access"
              data-testid="profile-top-btn"
              src={ profileIcon }
            />
          </Link>
        </button>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        { handleSearchIcon() }
      </header>
      <nav>
        { handleSearchBar() }
      </nav>
    </div>
  );
}

export default Header;

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchAbled: PropTypes.bool.isRequired,
};
