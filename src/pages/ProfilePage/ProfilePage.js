import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function ProfilePage() {
  const emailLS = localStorage.getItem('user')
    && JSON.parse((localStorage.getItem('user'))).email;

  const handlePathAndClearLS = () => {
    localStorage.clear();
    window.location.replace('http://localhost:3000/');
  };

  return (
    <div>
      <Header
        className="header"
        pageTitle="Perfil"
      />
      <h1>Tela de Perfil </h1>
      <div>
        <h3 data-testid="profile-email">{ emailLS }</h3>
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
          onClick={ handlePathAndClearLS }
        >
          Sair
        </button>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
