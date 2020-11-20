import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, search } = props;
  const [hide, setHide] = useState(true);

  const handleClick = () => {
    if (hide === true) setHide(false);
    if (hide === false) setHide(true);
  };

  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'lightGrey',
        textAlign: 'center',
      } }
    >
      <Link to="/perfil">
        <input
          type="image"
          src={ profileIcon }
          alt="icone do perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {
        (!search) ? '' : <input
          type="image"
          src={ searchIcon }
          alt="icone de pesquisa"
          data-testid="search-top-btn"
          onClick={ handleClick }
        />
      }
      {(hide === true) ? '' : <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
