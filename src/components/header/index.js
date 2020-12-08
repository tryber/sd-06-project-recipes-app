import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';
import profileIcon from '../../images/profileIcon.svg';
import '../../Style/Header.css';

function Header({ title, setSearch, isSearching, enableSearch = false }) {
  return (
    <header className="container-head">
      {
        enableSearch
        && <SearchButton setSearch={ setSearch } isSearching={ isSearching } />
      }
      <h2 data-testid="page-title" className="h2">{ title }</h2>
      <button type="button" className="btn btn-link">
        <Link
          to="/perfil"
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile"
          />
        </Link>
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  setSearch: PropTypes.func.isRequired,
  enableSearch: PropTypes.bool.isRequired,
};

export default Header;
