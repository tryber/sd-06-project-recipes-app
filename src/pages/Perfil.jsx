import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Context from '../context/Context';
import Footer from '../Components/Footer';

export default function Perfil({ history }) {
  const { titulo, setTitulo } = useContext(Context);

  let email2 = JSON.parse(localStorage.getItem('user'));
  const getEmail = () => {
    if (!email2) {
      email2 = { email: 'email@email.com' };
    }
  };

  useEffect(() => {
    setTitulo('Perfil');
    getEmail();
  }, []);

  const onClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <div className="container d-flex flex-column">
        {email2
          ? (
            <p data-testid="profile-email" className=" btn btn-warning font-weight-bold align-self-center lead">
              {`Usuario: ${email2.email}` }
            </p>)
          : <p data-testid="profile-email">email@email.com</p>}
        <Link to="/receitas-feitas">
          <button
            className="btn btn-warning form-control mb-3"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="btn btn-warning form-control mb-3"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          className="btn btn-warning"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ onClick }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};
