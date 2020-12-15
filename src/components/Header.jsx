import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProfileIcon, SearchIcon } from '../images';
import ReceitasContext from '../context/ReceitasContext';
import SearchBar from './SearchBar';

function Header({ requestAPI }) {
  const { disabledSearchIcon, disabledProfileIcon,
    titleHeader, showSearchBar, setShowSearchBar } = useContext(ReceitasContext);

  function toggleSearchBar() {
    if (!showSearchBar) setShowSearchBar(true);
    if (showSearchBar) setShowSearchBar(false);
  }

  const profileIcon = (
    <Link to="/perfil">
      <img data-testid="profile-top-btn" src={ ProfileIcon } alt="" />
    </Link>
  );

  const searchIcon = (
    <button className="header-icon-search" type="button" onClick={ toggleSearchBar }>
      <img data-testid="search-top-btn" src={ SearchIcon } alt="" />
    </button>
  );

  const titleElement = (<h3 data-testid="page-title">{ titleHeader }</h3>);

  return (
    <header className="header-container">
      <div className="header-icons">
        { (disabledSearchIcon) ? '' : searchIcon }
        { titleElement }
        { (disabledProfileIcon) ? '' : profileIcon }
      </div>
      {showSearchBar && (
        <div className="header-searchBar">
          <SearchBar requestAPI={ requestAPI } />
        </div>
      )}
    </header>
  );
}

Header.defaultProps = {
  requestAPI: () => null,
};

Header.propTypes = {
  requestAPI: propTypes.func,
};

export default Header;
