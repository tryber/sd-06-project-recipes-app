import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import './style.css';

export default function ProfilePage() {
  const emails = localStorage.getItem('user')
    && JSON.parse((localStorage.getItem('user'))).email;

  const handlePathAndClearLS = () => {
    localStorage.clear();
    window.location.replace('http://localhost:3000/');
  };

  return (
    <div>
      <Header
        pageTitle="Perfil"
      />
      <div className="user-info-container">
        <aside className="profile-aside">
          <h3 className="user-email" data-testid="profile-email">{ emails }</h3>
          <Link to="/receitas-feitas">
            <button
              className="button"
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              className="button"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <button
            className="button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handlePathAndClearLS }
          >
            Sair
          </button>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
