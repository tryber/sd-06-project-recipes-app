import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import '../Style/Profile.css';

function Profile() {
  if (!JSON.parse(localStorage.getItem('user'))) {
    return (
      <>
        <Header title="Perfil" />
        <span>Você não está logado!</span>
        <Footer />
      </>
    );
  }

  const getEmailFromLocalStorage = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return email;
  };

  const cleanLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <>
      <Header title="Perfil" />
      <section className="container-profile">
        <h3 data-testid="profile-email">{ getEmailFromLocalStorage() }</h3>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          <button
            type="button"
            className="btn btn-outline-dark-profile"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          <button
            type="button"
            className="btn btn-outline-dark-profile"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => cleanLocalStorage() }
        >
          <button
            type="button"
            className="btn btn-outline-dark-profile"
          >
            Sair
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
