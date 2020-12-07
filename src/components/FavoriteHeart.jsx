import React, { useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';
// import RecipesAppContext from '../context/RecipesAppContext';

function FavoriteHeart({ id, detailsDrink, detailsFood }) {
  const favoriteRecipes = 'favoriteRecipes';
  const responseFavoriteStorage = loadState(favoriteRecipes, [])
    .some((element) => element.id === id);
  const [favoriteButton, setFavoriteButton] = useState(responseFavoriteStorage);

  const favoriteMark = () => {
    if (favoriteButton === false) {
      setFavoriteButton(true);
    } else {
      setFavoriteButton(false);
    }
  };

  const saveFavoriteRecipe = () => {
    const loadFavoriteRecipe = loadState(favoriteRecipes, []);

    const response = loadFavoriteRecipe.filter((element) => element.id !== id);

    if (loadFavoriteRecipe.length > response.length) {
      saveState(favoriteRecipes, response);
    } else if (detailsDrink) {
      const {
        idDrink,
        strCategory,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
      } = detailsDrink;

      const payload = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      saveState(favoriteRecipes, [...loadFavoriteRecipe, payload]);
    } else if (detailsFood) {
      const {
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
      } = detailsFood;

      const payload = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      saveState(favoriteRecipes, [...loadFavoriteRecipe, payload]);
    }
    favoriteMark();
  };

  return (
    favoriteButton ? (
      <button
        type="button"
        onClick={ saveFavoriteRecipe }
        data-testid="heart-black"
      >
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="img-button-fav-black"
        />
      </button>
    ) : (
      <button
        type="button"
        onClick={ saveFavoriteRecipe }
        data-testid="heart-white"
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="img-button-fav-white"
        />
      </button>
    )
  );
}

FavoriteHeart.propTypes = {
  id: PropTypes.string.isRequired,
  detailsDrink: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
  detailsFood: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteHeart;
