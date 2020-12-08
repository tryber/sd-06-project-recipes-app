import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Components.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

function Header(props) {
  const { title, search = false } = props;
  const [hide, setHide] = useState(true);
  const showFilterButtons = title === 'Comidas' || title === 'Bebidas';
  const type = title === 'Comidas' ? 'meal' : 'drink';

  return (
    <header>
      <div className="header">
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
          (!search) ? <p>{' '}</p> : <input
            type="image"
            src={ searchIcon }
            alt="icone de pesquisa"
            data-testid="search-top-btn"
            onClick={ () => (hide ? setHide(false) : setHide(true)) }
          />
        }
      </div>
      <div className="filter">
        {(hide === true) ? (
          <FilterButtons
            show={ hide }
            shouldRenderButtons={ showFilterButtons }
            type={ type }
          />
        ) : <SearchBar title={ title } />}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
