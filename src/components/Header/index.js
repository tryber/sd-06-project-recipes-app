import React, { useState, useEffect } from 'react';

import './styles.css';

import { Link } from 'react-router-dom';

import IconSearchHeader from './IconSearchHeader';
import SearchBar from '../SearchBar/index';
import profileIcon from '../../images/profileIcon.svg';

const Header = () => {
  const [state, setState] = useState({
    namePage: '',
    search: true,
  });

  const changeHeader = () => {
    switch (window.location.pathname) {
    case '/perfil':
      return setState({
        namePage: 'Perfil',
        search: false,
      });
    case '/comidas':
      return setState({
        namePage: 'Comidas',
        search: true,
      });
    case '/bebidas':
      return setState({
        namePage: 'Bebidas',
        search: true,
      });
    case '/explorar':
      return setState({
        namePage: 'Explorar',
        search: false,
      });
    case '/explorar/comidas':
      return setState({
        namePage: 'Explorar Comidas',
        search: false,
      });
    case '/explorar/bebidas':
      return setState({
        namePage: 'Explorar Bebidas',
        search: false,
      });
    case '/explorar/comidas/ingredientes':
      return setState({
        namePage: 'Explorar Ingredientes',
        search: false,
      });
    case '/explorar/bebidas/ingredientes':
      return setState({
        namePage: 'Explorar Ingredientes',
        search: false,
      });
    case '/explorar/comidas/area':
      return setState({
        namePage: 'Explorar Origem',
        search: true,
      });
    case '/receitas-feitas':
      return setState({
        namePage: 'Receitas Feitas',
        search: false,
      });
    case '/receitas-favoritas':
      return setState({
        namePage: 'Receitas Favoritas',
        search: false,
      });
    default:
      return '';
    }
  };

  useEffect(() => {
    changeHeader();
  }, []);

  return (
    <div>
      <header className="header">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
          />
        </Link>
        <div>
          {
            !state ? <h2>Title</h2>
              : <h2 className="title" data-testid="page-title">{state.namePage}</h2>
          }
        </div>
        {!state.search ? <div />
          : <IconSearchHeader />}
      </header>
      <SearchBar />
    </div>

  );
};

export default Header;
