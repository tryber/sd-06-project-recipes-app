import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { profileIcon } from '../images';
import '../style/Header.css';

function SecondHeader({ title }) {
  const history = useHistory();
  return (
    <header>
      <nav className="header">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="Icone de perfil"
            />
          </button>
        </Link>
        <h1>
          { title }
        </h1>
        <button type="button" onClick={ history.goBack }>
          Voltar
        </button>
      </nav>
    </header>
  );
}

SecondHeader.propTypes = { title: PropTypes.string.isRequired };

export default SecondHeader;
