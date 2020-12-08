import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesAppContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../Style/Details.css';

function FavoriteButton({ id, title }) {
  const { recipes, isFavorite, setIsFavorite } = useContext(RecipesContext);
  let recipeType = '';
  let type = '';
  let alcoholicOrNot = '';
  let area = '';

  if (title === 'comidas') {
    recipeType = 'Meal';
    type = 'comida';
    alcoholicOrNot = '';
    area = recipes[0].strArea;
  } else {
    recipeType = 'Drink';
    type = 'bebida';
    alcoholicOrNot = recipes[0].strAlcoholic;
    area = '';
  }

  const addToFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipe = {
      id,
      type,
      area,
      category: recipes[0].strCategory,
      alcoholicOrNot,
      name: recipes[0][`str${recipeType}`],
      image: recipes[0][`str${recipeType}Thumb`],
    };

    const updatedFavoriteRecipes = [
      ...favoriteRecipes,
      recipe,
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    console.log('Olá Mundo');
    console.log(id);
  };

  const removeFromFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => (recipe.id !== id));

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const handleFavorites = () => {
    if (isFavorite) removeFromFavoriteRecipes();
    else addToFavoriteRecipes();

    setIsFavorite(!isFavorite);
  };

  const checkIfRecipeIsFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes.some((recipe) => (recipe.id === id));
    if (isRecipeFavorite) setIsFavorite(true);
  };

  useEffect(() => {
    checkIfRecipeIsFavorite();
    console.log(isFavorite);
    console.log(title);
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-dark-detail"
        onClick={ handleFavorites }
      >
        <img
          data-testid="favorite-btn"
          alt="Favoritar"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FavoriteButton;
