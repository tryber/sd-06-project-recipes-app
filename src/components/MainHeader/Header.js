import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesAppContext from '../../context/recipesAppContext';
import SearchBar from './SearchBar';
import { logoBlack, profileIcon } from '../../images';
import './style.css';

export default function Header({ pageTitle, BtnSearchBar }) {
  const { searchBar } = useContext(recipesAppContext);
  return (
    <div className="header-container">
      <header className="main-header">
        <img alt="logo" src={ logoBlack } className="logo-header" />
        <Link className="link" to="/perfil">
          <button
            className="btn-header"
            src={ profileIcon }
            type="button"
            data-testid="profile-top-btn"
          >
            <img className="icon" alt="Ícone de Perfil" src={ profileIcon } />
          </button>
        </Link>
        <div className="div-titulo">
          <h1 data-testid="page-title" className="header-title">{ pageTitle }</h1>
        </div>
        { BtnSearchBar && <BtnSearchBar /> }
      </header>
      { searchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  BtnSearchBar: propTypes.element.isRequired,
  pageTitle: propTypes.string.isRequired,
};
