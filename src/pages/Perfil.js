import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage !== null) {
      const { email } = JSON.parse(userLocalStorage);
      setUserEmail(email);
    }
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <span data-testid="profile-email">{ userEmail }</span>
      <Link to="receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="receitas-favoritas">
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
          onClick={ handleClearLocalStorage }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
