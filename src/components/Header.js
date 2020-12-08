import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import '../Css/Header.css';

function Header() {
  const location = useLocation();

  const verifyTitle = () => {
    switch (location.pathname) {
    case '/comidas':
      return 'Comidas';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    case '/perfil':
      return 'Perfil';
    default:
      return 'Detalhes';
    }
  };

  return (
    <div className="header-container">
      <div className="header-page-title">
        <Link to="/perfil">
          <button
            type="button"
            className="app-button-transparent"
          >
            <img
              src={ profileIcon }
              alt="Profile"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h2 data-testid="page-title">
          {verifyTitle()}
        </h2>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
