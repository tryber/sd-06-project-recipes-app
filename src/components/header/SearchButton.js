import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/searchIcon.svg';

function SearchButton({ setSearch, isSearching }) {
  return (
    <button
      className="btn btn-link"
      type="button"
      onClick={ () => setSearch(!isSearching) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search"
      />
    </button>
  );
}

SearchButton.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchButton;
