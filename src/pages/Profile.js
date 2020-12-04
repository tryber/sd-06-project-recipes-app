import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../style/Profile.css';

function Profile() {
  return (
    <div className="profile">
      <Header title="Perfil" />
      <div
        data-testid="profile-email"
      >
        { localStorage.user ? JSON.parse(localStorage.user).email : ''}
      </div>
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
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
