import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileIcon, searchIcon, logoImg } from '../images';
import SearchBar from './SearchBar';
import '../style/Header.css';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <nav className="header">
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Icone de perfil"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">
          { title }
        </h1>
        {
          (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas')
          && (
            <button
              type="button"
              onClick={ () => { setSearchBar(!searchBar); } }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Icone de busca"
              />
            </button>
          )
        }
        {
          (title === 'Perfil' || title === 'Receitas Feitas'
            || title === 'Receitas Favoritas' || title === 'Explorar'
            || title === 'Explorar Comidas' || title === 'Explorar Bebidas'
            || title === 'Explorar Ingredientes'
          ) && (
            <img
              className="header-logo"
              src={ logoImg }
              alt="Icone de busca"
            />
          )
        }
      </nav>
      <SearchBar
        title={ title }
        searchBar={ searchBar }
        setSearchBar={ setSearchBar }
      />
    </header>
  );
}

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;
