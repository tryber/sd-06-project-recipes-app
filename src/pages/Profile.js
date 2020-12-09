import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Footer, HeaderNoSearch } from '../components';

export default function Profile(props) {
  document.title = 'Perfil';

  const email = JSON.parse(localStorage.getItem('user'));

  function eraseLocalStorage() {
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('email');
    props.history.push('/');
  }
  return (
    <div>
      <HeaderNoSearch id="Perfil" />
      <section>
        {
          email ? <p data-testid="profile-email">{email.email}</p>
            : <p data-testid="profile-email">E-mail não encontrado</p>
        }
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => eraseLocalStorage() }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
