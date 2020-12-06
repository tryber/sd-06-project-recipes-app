import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../hooks/RecipesAppContext';
import profileIcon from '../styles/images/profileIcon.svg';
import searchIcon from '../styles/images/searchIcon.svg';
import HeaderSearch from './HeaderSearch';
// import './components.css';

function Header({ name, button }) {
  const {
    searchHeader,
    setSearchHeader,
  } = useContext(RecipesAppContext);

  const isClick = () => {
    if (searchHeader) {
      setSearchHeader(false);
    } else {
      setSearchHeader(true);
    }
  };

  return (
    <div data-testid="header">
      <header className="header">
        <button type="button" className="logo-profile" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="profile icon" />
        </button>
        <h1 data-testid="page-title">{name}</h1>
        { button && (
          <button
            type="button"
            className="logo-search"
            data-testid="search-top-btn"
            onClick={ isClick }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
        )}

      </header>
      <HeaderSearch enable={ searchHeader } name={ name } />
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  button: PropTypes.bool.isRequired,
};

export default Header;
