/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileIcon, searchIcon } from '../images';
import SearchBar from './SearchBar';
import '../style/Header.css';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <nav>
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
      </nav>
      <SearchBar
        title={ title }
        searchBar={ searchBar }
      />
    </header>
  );
}

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;
