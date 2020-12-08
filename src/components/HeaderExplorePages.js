import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchInput from './SearchInput';
import Filters from './Filters';
import RecipesContext from '../context/RecipesContext';

function HeaderExplorePages(props) {
  const { hiddenInput } = useContext(RecipesContext);

  const { pageName } = props;

  return (

    <div>
      <header className="Header">
        <Link to="/perfil" className="header-link">
          <button
            aria-label="profile-btn"
            type="button"
            src={ profileIcon }
            data-testid="profile-top-btn"
            className="header-profile-button"
          />
        </Link>
        <div className="header-explorePages-text">
          <h2 data-testid="page-title">
            {pageName}
          </h2>
        </div>
        {/* <button
          aria-label="search-btn"
          type="button"
          src={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => setHiddenInput(!hiddenInput) }
          className="header-search-button"
        /> */}
        { hiddenInput ? <SearchInput /> : null }
        { hiddenInput ? <Filters /> : null }
      </header>
    </div>
  );
}

HeaderExplorePages.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default HeaderExplorePages;
