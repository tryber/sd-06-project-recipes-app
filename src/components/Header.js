/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileIcon, searchIcon } from '../images';
import '../style/Header.css';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <header>
      <nav>
        <Link className="profile" to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
          />
        </Link>
        <h1
          data-testid="page-title"
          className="title"
        >
          { title }
        </h1>
        {
          (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas')
          && (
            <button
              className="searchButton"
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
