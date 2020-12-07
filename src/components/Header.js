import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';
import '../App.css';

function Header(props) {
  const { title, fetchApi, showSearchIcon = false } = props;
  const { showSearchBar, setSearchBar, setTypeRecipe } = useContext(ContextRecipes);
  const location = useLocation().pathname;

  const toggleSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  useEffect(() => {
    if (location.includes('comidas')) {
      setTypeRecipe('food');
    } else {
      setTypeRecipe('drink');
    }
  }, []);

  return (
    <div>
      <div className="header-container">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2 className="main-title" data-testid="page-title">{title}</h2>
        { showSearchIcon
          ? (
            <div>
              <img
                src={ searchIcon }
                alt="Search"
                data-testid="search-top-btn"
                className="icon-search"
                onClick={ toggleSearchBar }
                aria-hidden="true"
              />
            </div>
          ) : <div /> }
      </div>
      <br />
      <br />
      <br />
      <div>
        {showSearchBar ? <SearchBar fetchApi={ fetchApi } /> : null}
      </div>
    </div>
  );
}

Header.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
