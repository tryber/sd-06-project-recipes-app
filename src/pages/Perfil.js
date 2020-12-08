import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';
import '../components/perfil.css';

function Perfil() {
  const history = useHistory();

  function redirectFeitas() {
    history.push('/receitas-feitas');
  }

  function redirectFavoritas() {
    history.push('/receitas-favoritas');
  }

  function redirectSair() {
    localStorage.clear();
    history.push('/');
  }

  let emailLocalStorage;
  if (localStorage.getItem('user')) {
    const objLocalStorage = JSON.parse(localStorage.getItem('user'));
    emailLocalStorage = objLocalStorage.email;
  }

  return (
    <div>
      <Header2 title="Perfil" />
      <p className="email-localStorage" data-testid="profile-email">
        {'Email: '}
        { emailLocalStorage }
      </p>
      <button
        className="botoes"
        data-testid="profile-done-btn"
        type="button"
        onClick={ redirectFeitas }
      >
        Receitas Feitas
      </button>
      <button
        className="botoes"
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ redirectFavoritas }
      >
        Receitas Favoritas
      </button>
      <button
        className="botoes"
        data-testid="profile-logout-btn"
        type="button"
        onClick={ redirectSair }
      >
        Sair
      </button>
      <MenuInferior />
    </div>
  );
}

export default Perfil;
