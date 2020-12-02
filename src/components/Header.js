import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

export default function Header(props) {
  const [ssBar, setssBar] = useState(false);
  const searchBar = ((ssBar === true) ? <SearchBar /> : (null));

  function handleSearch() {
    setssBar(!ssBar);
  }

  const { title } = props;

  const searchButton = (
    (title === 'Comidas'
    || title === 'Bebidas'
    || title === 'Explorar Origem'
    || title === 'Receitas Favoritas'
    || title === 'Receitas Feitas'
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
      : (null)
    ));

  return (
    <div className="header">
      <Link to="/perfil" data-testid="profile-top-btn" src={ profileIcon }>
        <img src={ profileIcon } alt="profile" className="perfil-icon" />
      </Link>
      <h2 className="header-title" data-testid="page-title">{ title }</h2>
      {searchButton}
      {searchBar}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
