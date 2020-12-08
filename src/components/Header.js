import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, searchBtn = false }) => {
  const { searchBox, setSearchBox } = useContext(ReceitasContext);

  const showSearchBar = () => setSearchBox(!searchBox);

  return (
    <section
      className="navbar"
      style={ { background: '#7850B8' } }
    >
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile button"
        />
      </Link>
      <h3 data-testid="page-title">
        {title}
      </h3>
      {searchBtn ? (
        <button
          type="button"
          className="border-0 bg-transparent"
          onClick={ showSearchBar }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="show-hide-sbr"
          />
        </button>
      ) : (
        <div />
      )}
    </section>
  );
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
