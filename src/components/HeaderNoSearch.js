import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import perfil from '../images/profileIcon.svg';

export default function HeaderNoSearch(props) {
  const { id } = props;
  return (
    <div>
      <div>
        <Link to="/perfil">
          <button type="button" src={ perfil }>
            <img
              src={ perfil }
              alt="perfil"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      </div>
      <div>
        <span data-testid="page-title">{ id }</span>
      </div>
    </div>
  );
}

HeaderNoSearch.propTypes = {
  id: PropTypes.string.isRequired,
};
