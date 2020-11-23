import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ pageName, renderSearch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const renderSearchIcon = () => (
    <button
      type="button"
      onClick={ () => setShowSearchBar(!showSearchBar) }
    >
      <img
        className="header-icon"
        src={ searchIcon }
        alt="searchIcon"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img
          className="header-icon"
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>

      <h2 data-testid="page-title">{ pageName }</h2>
      { renderSearch ? renderSearchIcon() : null }
      { showSearchBar && <SearchBar page={ pageName } /> }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool.isRequired,
};
