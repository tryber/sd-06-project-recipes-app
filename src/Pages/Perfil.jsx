import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Perfil.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => {
  const handleEmailLocalStorage = () => {
    if (localStorage.getItem('user') === null) {
      const email = [];
      localStorage.setItem('user', JSON.stringify(email));
    } else {
      const userEmail = JSON.parse(localStorage.getItem('user'));
      console.log(userEmail);

      return userEmail;
    }
  };

  useEffect(() => {
    handleEmailLocalStorage();
  }, []);

  const removePerfilLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('cocktailsToken');
  };

  return (
    <div>
      <Header />
      <div className="main-perfil">
        <div
          className="text-email"
          data-testid="profile-email"
        >
          {handleEmailLocalStorage() && handleEmailLocalStorage().email}
        </div>
        <div className="container-button-perfil">
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link
            to="/receitas-favoritas"
          >
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link
            to="/"
          >
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ removePerfilLocalStorage }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
