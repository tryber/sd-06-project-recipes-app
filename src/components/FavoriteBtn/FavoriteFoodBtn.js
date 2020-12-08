import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import ContextAPI from '../../Context/ContextAPI';

const FavoriteFoodButton = () => {
  const { detailsInfo } = useContext(ContextAPI);
  const [isFavorite, setIsFavorite] = useState(false);
  const path = window.location.href;
  const isFoodPage = path.includes('comidas');
  const paramID = useParams().id;

  const loadFavoriteRecipesFromLocalStorage = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes[0] ? favoriteRecipes
      .find((recipe) => recipe.id === paramID) : undefined;

    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  };

  useEffect(() => {
    loadFavoriteRecipesFromLocalStorage();
  }, []);

  const getFoodObject = (currentFood) => {
    const foodData = {
      id: currentFood.idMeal,
      type: 'comida',
      area: currentFood.strArea,
      category: currentFood.strCategory,
      alcoholicOrNot: '',
      name: currentFood.strMeal,
      image: currentFood.strMealThumb,
    };

    return foodData;
  };

  const getDrinkObject = (currentDrink) => {
    const drinkData = {
      id: currentDrink.idDrink,
      type: 'bebida',
      area: '',
      category: currentDrink.strCategory,
      alcoholicOrNot: currentDrink.strAlcoholic,
      name: currentDrink.strDrink,
      image: currentDrink.strDrinkThumb,
    };

    return drinkData;
  };

  const checkIfIsAlreadyFavorite = (favoriteRecipes, currentRecipe) => {
    const isAlreadyAFavorite = favoriteRecipes
      .find((recipe) => (isFoodPage
        ? (recipe.id === currentRecipe.idMeal) : recipe.id === currentRecipe.idDrink));

    return isAlreadyAFavorite;
  };

  const handleFavorite = () => {
    const currentRecipe = isFoodPage
      ? detailsInfo.foods : detailsInfo.drinks;
    const recipeData = isFoodPage
      ? getFoodObject(currentRecipe) : getDrinkObject(currentRecipe);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const emptyFavorites = 0;
    const isFavoriteRecipesNotEmpty = favoriteRecipes.length > emptyFavorites;
    const isAlreadyAFavorite = isFavoriteRecipesNotEmpty
      ? checkIfIsAlreadyFavorite(favoriteRecipes, currentRecipe) : undefined;

    if (isAlreadyAFavorite) {
      setIsFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes
        .filter((recipe) => (isFoodPage
          ? (recipe.id !== currentRecipe.idMeal)
          : (recipe.id !== currentRecipe.idDrink)))]));
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoriteRecipes, recipeData]));
    }
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
    >
      <img
        data-testid="favorite-btn"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        alt={ !isFavorite ? 'whiteHeartIcon' : 'blackHeartIcon' }
      />
    </button>);
};

export default FavoriteFoodButton;
