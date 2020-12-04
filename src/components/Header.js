import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesAppContext from '../context/recipesAppContext';
import SearchBar from './SearchBar';
import { profileIcon } from '../images';

export default function Header({ className, pageTitle, BtnSearchBar }) {
  const { searchBar } = useContext(recipesAppContext);
  return (
    <div>
      <header
        name="header"
        className={ className }
      >
        <Link to="/perfil">
          <button
            className="btn-header"
            src={ profileIcon }
            type="button"
            data-testid="profile-top-btn"
          >
            <img className="icon" alt="Ícone de Perfil" src={ profileIcon } />
          </button>
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        { BtnSearchBar && <BtnSearchBar /> }

      </header>
      { searchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  BtnSearchBar: propTypes.element.isRequired,
  className: propTypes.string.isRequired,
  pageTitle: propTypes.string.isRequired,
};
