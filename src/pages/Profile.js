import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  let email = '';
  if (localStorage.user) {
    const userStorage = JSON.parse(localStorage.user);
    email = userStorage.email;
  }
  return (
    <div>
      <div data-testid="profile-email" className="email-profile">
        {email}
      </div>
      <div className="wrap-profile">
        <Link to="receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
            className="bt-login font-app bt-space"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
            className="bt-login font-app bt-space"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className="bt-login font-app bt-space"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
}
