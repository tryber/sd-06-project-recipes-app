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
      <span data-testid="profile-email">
        {email}
      </span>
      <div>
        <Link to="receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
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
