import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ isFavorite, changesFavorites, index }) {
  return (
    isFavorite
      ? (
        <button
          className="button-favorite"
          data-testid={ typeof index !== 'number'
            ? ('favorite-btn')
            : (`${index}-horizontal-favorite-btn`) }
          type="button"
          onClick={ changesFavorites }
          src={ blackHeartIcon }
        >
          <img src={ blackHeartIcon } alt="shareButton" />
        </button>
      )
      : (
        <button
          className="button-favorite"
          data-testid="favorite-btn"
          type="button"
          onClick={ changesFavorites }
          src={ whiteHeartIcon }
        >
          <img src={ whiteHeartIcon } alt="shareButton" />
        </button>
      )
  );
}

FavoriteBtn.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  changesFavorites: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default FavoriteBtn;
