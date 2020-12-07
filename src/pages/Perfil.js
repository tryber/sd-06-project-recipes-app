import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';

function Perfil() {
  const getEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header title="Perfil" />
      <h3
        data-testid="profile-email"
        className="perfil-header"
      >
        { getEmail && getEmail.email }
      </h3>
      <div className="explore-btn">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="btn btn-light btn-lg btn-block btn-exp"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="btn btn-light btn-lg btn-block btn-exp"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
      </div>
      <div>
        <Link exact to="/" className="exit-btn">
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="btn btn-secondary exit-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
