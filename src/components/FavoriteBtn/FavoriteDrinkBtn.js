import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { detailsDrinkById } from '../../services/aPI';

const FavoriteDrinkButton = () => {
  const [stateLocal, setStatelocal] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const currentDrinkID = useParams().id;

  const handleIdDetails = async () => {
    const drink = await detailsDrinkById(currentDrinkID);

    setStatelocal({ ...stateLocal, drink });
  };

  const loadFavoriteRecipesFromLocalStorage = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes[0] ? favoriteRecipes
      .find((recipe) => recipe.id === currentDrinkID) : undefined;

    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  };

  useEffect(() => {
    handleIdDetails();
    loadFavoriteRecipesFromLocalStorage();
  }, []);

  const handleFavorite = () => {
    const currentDrink = stateLocal.drink.drinks[0];
    const recipeData = {
      id: currentDrink.idDrink,
      type: 'bebida',
      area: '',
      category: currentDrink.strCategory,
      alcoholicOrNot: currentDrink.strAlcoholic,
      name: currentDrink.strDrink,
      image: currentDrink.strDrinkThumb,
    };

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const zero = 0;
    const isAlreadyAFavorite = favoriteRecipes.length > zero
      ? favoriteRecipes.find((recipe) => recipe.id === currentDrink.idDrink) : undefined;

    if (isAlreadyAFavorite) {
      setIsFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes
        .filter((recipe) => recipe.id !== currentDrink.idDrink)]));
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

export default FavoriteDrinkButton;
