import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from './Components';
import favoriteIcon from '../images/favoriteIcon.png';
import doneIcon from '../images/doneIcon.png';
import '../Style/perfil.css';

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
      <div className="profile-container">
        <h3
          data-testid="profile-email"
          className="explore-btn"
        >
          { JSON.parse(localStorage.user).email }
        </h3>
        <div>
          <Link
            to="/receitas-feitas"
            data-testid="profile-done-btn"
            className="profile-btn"
          >
            <img src={ doneIcon } alt="Done Recipes" />
            Receitas Feitas
          </Link>
          <Link
            to="/receitas-favoritas"
            data-testid="profile-favorite-btn"
            className="profile-btn"
          >
            <img src={ favoriteIcon } alt="Favorite Recipes" />
            Receitas Favoritas
          </Link>
        </div>
        <div className="signout-container">
          <Link to="/">
            <button
              onClick={ handleLogout }
              type="button"
              data-testid="profile-logout-btn"
              className="signout-btn"
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
