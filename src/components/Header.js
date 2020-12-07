import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';

// Icons
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styled Components
import { HeaderContainer, HeaderTitle, IconStyle } from '../styles/headerStyle';

// Context
import RecipesContext from '../context/RecipesContext';

function HeaderFood() {
  const { searchBar, setSearchBar } = useContext(RecipesContext);

  const path = window.location.pathname;
  let title = '';
  // eslint-disable-next-line no-unused-vars
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
    setSearchBar(true);
    if (searchBar === true) {
      setSearchBar(false);
    }
  };

  return (
    <HeaderContainer>
      <IconStyle>
        <Link to="/perfil">
          <FontAwesomeIcon icon={ faUser } size="3x" />
        </Link>
      </IconStyle>

      <HeaderTitle>
        {`[  ${title}  ]`}
      </HeaderTitle>

      <IconStyle>
        <FontAwesomeIcon
          icon={ faSearch }
          size="3x"
          onClick={ handleShowBar }
        />
      </IconStyle>
    </HeaderContainer>
  );
}

export default HeaderFood;
