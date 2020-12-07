import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ pageName, renderSearch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  let title;

  title = pageName === '/bebidas' ? 'Bebidas' : pageName;
  title = pageName === '/comidas' ? 'Comidas' : title;

  title = pageName === '/explorar/bebidas' ? 'Explorar Bebidas' : title;
  title = pageName === '/explorar/comidas' ? 'Explorar Comidas' : title;

  const renderSearchIcon = () => (
    <button
      type="button"
      onClick={ () => setShowSearchBar(!showSearchBar) }
      className="search-button"
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
      <Link to="/perfil" className={ !renderSearch && 'flex-order' }>
        <img
          className="header-icon profile-icon"
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2
        data-testid="page-title"
        className={ !renderSearch && 'flex-order' }
      >
        { title }
      </h2>
      { renderSearch ? renderSearchIcon() : null }
      { showSearchBar
      && <SearchBar page={ title } setDisplay={ { setShowSearchBar, showSearchBar } } /> }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool.isRequired,
};
