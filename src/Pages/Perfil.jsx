import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../Components';

function Perfil() {
  if (!localStorage.user) {
    localStorage.user = JSON.stringify({ email: '' });
  }
  const handleLogout = () => {
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('user');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');
  };
  return (
    <div>
      <Header pageName="Perfil" />
      <div style={ { marginTop: '80px' } }>
        <h3 data-testid="profile-email">{ JSON.parse(localStorage.user).email }</h3>
        <div>
          <Link to="/receitas-feitas">
            <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
          </Link>
        </div>
        <div>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button
              onClick={ handleLogout }
              type="button"
              data-testid="profile-logout-btn"
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
