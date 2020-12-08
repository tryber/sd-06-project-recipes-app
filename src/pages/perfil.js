import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Header, Footer } from '../components';
import { PerfilContainer, HeaderContainer } from './style/Perfil';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.LogOut = this.LogOut.bind(this);
  }

  LogOut() {
    localStorage.clear();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const emailLS = JSON.parse(localStorage.getItem('user'));
    let email;
    if (!emailLS) {
      email = '';
    } else {
      email = emailLS.email;
    }

    return (
      <div>
        <Header title="Perfil" noSearchBar />
        <HeaderContainer>
          <h3 data-testid="profile-email">{email}</h3>
        </HeaderContainer>
        <PerfilContainer>
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
            onClick={ () => this.LogOut() }
          >
            Sair
          </button>

        </PerfilContainer>
        <Footer title="Perfil" />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Perfil;
