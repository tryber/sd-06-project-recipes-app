import React from 'react';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { ProfileContainer, Title } from '../styles/profileStyle';

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
    <section>
      <Header />
      <ProfileContainer>
        <span>
          <FontAwesomeIcon
            icon={ faUser }
            size="5x"
          />
        </span>
        <Title data-testid="profile-email">{email}</Title>
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
      </ProfileContainer>
    </section>
  );
}

export default MainFood;
