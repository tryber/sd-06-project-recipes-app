import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function HeaderFood() {
  const [showBar, setShowBar] = useState(false);
  const path = window.location.pathname;
  let title = '';
  let searchIconShow;
  if (path === '/comidas') {
    title = 'Comidas'; searchIconShow = true;
  } else if (path === '/bebidas') {
    title = 'Bebidas'; searchIconShow = true;
  } else if (path === '/explorar') {
    title = 'Explorar'; searchIconShow = false;
  } else if (path === '/explorar/comidas') {
    title = 'Explorar Comidas'; searchIconShow = false;
  } else if (path === '/explorar/bebidas') {
    title = 'Explorar Bebidas'; searchIconShow = false;
  } else if (path === '/explorar/comidas/ingredientes') {
    title = 'Explorar Ingredientes'; searchIconShow = false;
  } else if (path === '/explorar/bebidas/ingredientes') {
    title = 'Explorar Ingredientes'; searchIconShow = false;
  } else if (path === '/explorar/comidas/area') {
    title = 'Explorar Origem'; searchIconShow = true;
  } else if (path === '/perfil') {
    title = 'Perfil'; searchIconShow = false;
  } else if (path === '/receitas-feitas') {
    title = 'Receitas Feitas'; searchIconShow = false;
  } else if (path === '/receitas-favoritas') {
    title = 'Receitas Favoritas'; searchIconShow = false;
  }

  const handleShowBar = () => {
    if (showBar) {
      setShowBar(false);
    } else if (!showBar) {
      setShowBar(true);
    }
  };

  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      { searchIconShow ? <input
        onClick={ handleShowBar }
        type="image"
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search"
      /> : null}
      { showBar ? <SearchBar /> : null}
    </div>
  );
}

export default HeaderFood;
