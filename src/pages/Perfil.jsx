import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { loadState } from '../services/localStorage';
import '../styles/marginHederAndFooter.css';
import '../styles/Perfil.css';

function Perfil({ history }) {
  const user = loadState('user', { email: '' });

  // Logout and redirect to login page
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="container-margin-heder container-margin-footer">
      <Header name="Perfil" button={ false } />
      <div className="profile container-big-btn">
        <span data-testid="profile-email" className="name-email">
          {user.email}
        </span>
        <Link to="/receitas-feitas">
          <button
            className="big-btn done-btn"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="big-btn favorite-btn-login"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          className="big-btn logout-btn"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleLogout() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Perfil;
