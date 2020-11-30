import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  const getEmailFromLocalStorage = localStorage.getItem('user');
  const userEmail = JSON.parse(getEmailFromLocalStorage);

  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      <section className="profile-container">
        <section className="profile-email">
          <h3 data-testid="profile-email">{userEmail.email}</h3>
        </section>
        <section className="profile-buttons">
          <Link to="/receitas-feitas">
            <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
          </Link>
          <Link to="/receitas-favoritas">
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
        </section>
      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.perfil,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Perfil);

Perfil.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
