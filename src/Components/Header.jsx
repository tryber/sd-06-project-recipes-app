import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../Style/Header.css';
import SearchBar from './SearchBar';

function Header({ pageName }) {
  const [divShow, setDivShow] = useState('hide');

  function handleClick() {
    if (divShow === 'hide') {
      const header = document.getElementsByClassName('header');
      const filters = document.getElementsByClassName('filter-container');
      const ZERO = 0;
      header[0].style.borderRadius = ZERO;
      filters[0].style.marginTop = '150px';
      setDivShow('show');
    } else {
      const header = document.getElementsByClassName('header');
      const filters = document.getElementsByClassName('filter-container');
      header[0].style = '';
      filters[0].style = '';
      setDivShow('hide');
    }
  }

  return (
    <div className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile Icon Button"
        />
      </Link>
      <p data-testid="page-title" className="page-title">{pageName}</p>
      { (pageName !== 'Favorite Recipes' && pageName !== 'Recipes Done'
      && pageName !== 'Explore' && pageName !== 'Explore Foods'
      && pageName !== 'Explore Drinks' && pageName !== 'Explore Ingredients'
      && pageName !== 'Profile')
        && (
          <button className="button-search" type="button" onClick={ handleClick }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search Icon Button"
              className="search-top-button"
            />
          </button>
        )}
      {divShow !== 'hide' && <SearchBar className={ divShow } />}
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

export default Header;
