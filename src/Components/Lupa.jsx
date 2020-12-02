import React from 'react';
import PropTypes from 'prop-types';
import searchImage from '../images/searchIcon.svg';

export default function Lupa({ onClick }) {
  return (
    <div className="lupa">
      <button 
        type="button"
        onClick={ onClick }
        className="btn-warning"
      >
        <img
          data-testid="search-top-btn"
          src={ searchImage }
          alt="search"
        />
      </button>
    </div>
  );
}

Lupa.propTypes = {
  onClick: PropTypes.func.isRequired,
};
