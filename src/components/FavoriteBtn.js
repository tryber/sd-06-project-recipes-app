import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../css/FavoriteBtn.css';

function FavoriteBtn({ id, type, recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setFavoriteList } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const isDrink = pathname.includes('bebidas');

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite !== null) {
      const alreadyFavorite = favorite.some(({ id: recipeId }) => recipeId === id);
      setIsFavorite(alreadyFavorite);
    }
  }, [isFavorite]);

  const addFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let favoriteData = {
      id: recipe.idMeal,
      type,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (isDrink) {
      favoriteData = {
        id: recipe.idDrink,
        type,
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }

    if (currentFavorite !== null) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...currentFavorite, favoriteData]));
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([favoriteData]));
    }

    setIsFavorite(true);
  };

  const removeFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = currentFavorite.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavoriteList(newFavorite);

    setIsFavorite(false);
  };

  if (isFavorite) {
    return (
      <button
        type="button"
        onClick={ () => removeFavorite() }
        className="btn-favorite"
      >
        <img
          alt="Set this recipe as favorite"
          className="btn-favorite-img"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={ () => addFavorite() }
      className="btn-favorite"
    >
      <img
        alt="Set this recipe as favorite"
        className="btn-favorite-img"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
      />
    </button>
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;
