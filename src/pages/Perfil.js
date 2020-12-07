import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const [userEmail, setUserEmail] = useState('email@mail.com');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      setUserEmail(user.email);
    }
  }, []);

  function handleExit() {
    localStorage.clear();
  }

  return (
    <div className="food-container">
      <Header title="Perfil" />
      <div className="body-perfil">
        <p data-testid="profile-email">{userEmail}</p>

        <div>
          <Link to="/receitas-feitas">
            <button
              data-testid="profile-done-btn"
              type="button"
              className="btn-sub-header"
            >
              Receitas Feitas
            </button>
          </Link>
        </div>

        <div>
          <Link to="/receitas-favoritas">
            <button
              data-testid="profile-favorite-btn"
              type="button"
              className="btn-sub-header"
            >
              Receitas Favoritas
            </button>
          </Link>
        </div>

        <div>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ handleExit }
              className="btn-sub-header"
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
