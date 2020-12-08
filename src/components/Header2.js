import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImage from '../images/profileIcon.svg';

function Header2({ title }) {
  const history = useHistory();
  function redirectProfile() {
    history.push('/perfil');
  }

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileImage }
        onClick={ redirectProfile }
      >
        <img src={ profileImage } alt="profile-img" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header2.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header2;
