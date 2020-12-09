import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import perfil from '../images/profileIcon.svg';
import busca from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ id, ingredient }) {
  const [search, setSearch] = useState(false);

  return (
    <div className="header">
      <div className="content">
        <div className="btn-header">
          <Link to="/perfil">
            <button type="button" src={ perfil }>
              <img
                src={ perfil }
                alt="perfil"
                data-testid="profile-top-btn"
              />
            </button>
          </Link>
        </div>
        <div className="page-title">
          <span data-testid="page-title">{ document.title }</span>
        </div>
        <div className="btn-header">
          <button
            type="button"
            src={ busca }
            data-testid="search-top-btn"
            onClick={ () => { setSearch(!search); } }
          >
            <img
              src={ busca }
              alt="busca"
            />
          </button>
        </div>
      </div>
      <div>
        {(search || ingredient !== '')
          ? <SearchBar id={ id } ingredient={ ingredient } class="searchbar" /> : '' }
      </div>
    </div>
  );
}
Header.propTypes = {
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.string,
};

Header.defaultProps = {
  ingredient: '',
};
