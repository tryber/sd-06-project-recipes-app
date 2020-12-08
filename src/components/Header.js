import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchRecipes from './SearchRecipes';

function Header({ pathname, componentConfig }) {
  const [toggleSearch, setToogleSearch] = useState(false);
  const { title, profileButton, searchButton } = componentConfig;

  const renderProfileButton = () => {
    if (profileButton) {
      return (

        <Link to="/perfil" replace>
          <button
            type="button"
          >
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      );
    }
  };

  const renderTitle = () => (
    <h1 data-testid="page-title">
      {title}
    </h1>
  );

  const renderSearchButton = () => {
    if (searchButton) {
      return (
        <button
          type="button"
          className="header__search__bar"
          onClick={ () => setToogleSearch(!toggleSearch) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>
      );
    }
  };

  const renderSearchRecipeComponent = () => (
    toggleSearch ? (
      <SearchRecipes
        title={ title }
        pathname={ pathname }
      />) : null
  );

  return (
    <div className="header__container">
      {renderProfileButton()}
      {renderTitle()}
      {renderSearchButton()}
      {renderSearchRecipeComponent()}
    </div>);
}

export default Header;

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  componentConfig: PropTypes.shape({
    profileButton: PropTypes.bool.isRequired,
    searchButton: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
