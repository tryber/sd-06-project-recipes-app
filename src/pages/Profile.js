import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../style/Profile.css';

function Profile() {
  return (
    <div className="profile">
      <Header title="Perfil" />
      <div className="div-profile">
        <p
          className="email"
          data-testid="profile-email"
        >
          { localStorage.user ? JSON.parse(localStorage.user).email : ''}
        </p>
        <Link to="/receitas-feitas">
          <button
            className="bttn-recipe bttn-make"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="bttn-recipe bttn-favorite"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className="bttn-recipe bttn-logout"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
