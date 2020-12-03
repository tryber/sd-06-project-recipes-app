import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';
import { loadState } from '../services/localStorage';

function Perfil({ history }) {
  const user = loadState('user', { email: '' });

  // Logout and redirect to login page
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header name="Perfil" button={ false } />
      <div className="profile">
        <span data-testid="profile-email">
          {user.email}
        </span>
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
          onClick={ () => handleLogout() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Perfil;
