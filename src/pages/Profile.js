import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainFood() {
  const userEmail = JSON.parse(localStorage.getItem('user')) || '';
  const { email } = userEmail;

  const doneRedirect = () => {
    window.location.pathname = '/receitas-feitas';
  };

  const favoriteRedirect = () => {
    window.location.pathname = '/receitas-favoritas';
  };

  const logout = () => {
    localStorage.clear();
    window.location.pathname = '/';
  };

  return (
    <div>
      <Header />
      <h2 data-testid="profile-email">{email}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ doneRedirect }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ favoriteRedirect }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logout }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default MainFood;
