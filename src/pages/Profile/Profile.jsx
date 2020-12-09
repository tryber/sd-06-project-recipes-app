import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Profile = (props) => {
  const { location } = props;
  const { pathname } = location;
  const user = JSON.parse(localStorage.getItem('user'));

  const hash = md5(user.email);

  return (
    <div className="explore-container">
      <Header pathname={ pathname } />
      <div className="explore-buttons">
        <div>
          <img className="avatar" src={ `https://www.gravatar.com/avatar/${hash}?s=200` } alt="Avatar" />
        </div>
        <h3
          className="email-perfil"
          data-testid="profile-email"
        >
          {(user) ? user.email : 'teste@trybe.com' }
        </h3>
        <Link to="/receitas-feitas">
          <button
            className="btn btn-explore btn-active"
            type="button"
            data-testid="profile-done-btn"
          >
            Done recipes
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="btn btn-explore btn-active"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite recipes
          </button>
        </Link>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
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
