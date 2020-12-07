import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';

const Profile = (props) => {
  const { location, history } = props;
  const { pathname } = location;
  const user = JSON.parse(localStorage.getItem('user'));

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header pathname={ pathname } />
      <div className="profile-container">
        <h3 data-testid="profile-email">{(user) ? user.email : 'teste@trybe.com' }</h3>
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
          onClick={ () => handleLogout() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

Profile.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string,
  history: PropTypes.shape().isRequired,
};

Profile.defaultProps = {
  pathname: 'perfil',
};
