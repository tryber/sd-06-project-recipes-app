import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import setRecipeAsFavorite from '../utils/setRecipeAsFavorite';

function FavButton({ isFav, setIsFav, id, recipe, type }) {
  function saveRecipe() {
    setIsFav(!isFav);
    setRecipeAsFavorite(id, recipe, type);
  }

  return (
    <button type="button" onClick={ saveRecipe }>
      <img
        type="button"
        alt="shareIcon"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavButton.propTypes = {
  isFav: PropTypes.bool.isRequired,
  setIsFav: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape.isRequired,
};

export default FavButton;
