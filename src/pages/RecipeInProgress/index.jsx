import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import { useCook } from '../../hooks/cook';
import { useRecipes } from '../../hooks/recipes';

import parseRecipeToFavorite from '../../utils/parseFavoriteRecipeFormat';
import parseIngredientAndMeasures from '../../utils/parseIngredientAndMeasures';

import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

function RecipeInProgress({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    cookedRecipes,
    recipesProgress,
    updateRecipeProgress,
    finalizeRecipe,
    loadRecipeToCook,
  } = useCook();

  const { id } = useParams();

  const { push } = useHistory();

  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  useEffect(() => {
    const recipeToCook = cookedRecipes[pageType].find(({ recipe }) => (
      recipe.idMeal === id
    ));

    if (!recipeToCook) {
      loadRecipeToCook(pageType, id);
    }
  }, []);

  const handleShareClick = useCallback(() => {
    const url = `http://localhost:3000/${pageType}/${id}`;

    copy(url);

    setCopiedLink(true);
  }, [id, pageType]);

  const currentlyCooking = useMemo(() => {
    const recipeToCook = cookedRecipes[pageType].find(({ recipe }) => (
      recipe.idMeal === id || recipe.idDrink === id
    ));

    if (!recipeToCook) {
      return {
        error: 'Ocorreu um erro ao carregar sua recita. tente Novamente.',
      };
    }

    return recipeToCook.recipe;
  }, [id, cookedRecipes, pageType]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteRecipe = parseRecipeToFavorite(pageType, currentlyCooking);

    updateFavoriteRecipes(favoriteRecipe, recipeIsFavorited);
  }, [id, pageType, currentlyCooking, updateFavoriteRecipes, recipeIsFavorited]);

  const recipeIngredients = useMemo(() => {
    const ingredients = parseIngredientAndMeasures(currentlyCooking);

    return ingredients;
  }, [currentlyCooking]);

  const handleIngredientClick = useCallback(({ target }) => {
    const itemIndex = target.value;

    updateRecipeProgress(pageType, id, itemIndex);
  }, [updateRecipeProgress, id, pageType]);

  const currentProgress = useMemo(() => {
    const accessKey = (pageType === 'comidas') ? 'meals' : 'cocktails';

    const progressArray = recipesProgress[accessKey][id];

    if (!progressArray) {
      return [];
    }

    const newProgressArray = [...progressArray];

    return newProgressArray;
  }, [recipesProgress, id]);

  const canFinalizeRecipe = useMemo(() => {
    const everyIngredientChecked = recipeIngredients.every(
      (_, index) => currentProgress.includes(`${index}`),
    );

    return everyIngredientChecked;
  }, [recipeIngredients, currentProgress]);

  const handleFinalizeRecipe = useCallback(() => {
    finalizeRecipe(pageType, id);

    push('/receitas-feitas');
  }, [id, finalizeRecipe, pageType, push]);

  if (currentlyCooking.error) {
    return (
      <div className="recipe-dint-start">
        <p>{currentlyCooking.error}</p>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={ currentlyCooking.strMealThumb || currentlyCooking.strDrinkThumb }
        alt={ currentlyCooking.strMeal || currentlyCooking.strDrink }
      />

      <h2 data-testid="recipe-title">
        {currentlyCooking.strMeal || currentlyCooking.strDrink}
      </h2>

      <p data-testid="recipe-category">
        {currentlyCooking.strAlcoholic || currentlyCooking.strCategory}
      </p>

      {(pageType === 'comidas') && (
        <p>{currentlyCooking.strArea}</p>
      )}

      <div className="share-btn-container">
        <button
          onClick={ handleShareClick }
          type="button"
        >
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="share this recipe"
          />
        </button>

        {copiedLink && (
          <span>Link copiado!</span>
        )}
      </div>

      <div className="favorites-btn-container">
        <button type="button" onClick={ handleFavoriteToggle }>
          <img
            data-testid="favorite-btn"
            src={ recipeIsFavorited ? blackHeart : whiteHeart }
            alt="favorite this recipe"
          />
        </button>
      </div>

      <div className="recipe-ingredients in-progress-ingredients">
        {recipeIngredients.map((ingredient, index) => (
          <div
            className="ingredients-checkbox-container"
            key={ ingredient }
          >

            <label
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient }
              className={ currentProgress.includes(`${index}`) ? 'item-checked' : '' }
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ ingredient }
                value={ index }
                checked={ currentProgress.includes(`${index}`) }
                onChange={ handleIngredientClick }
              />

              {ingredient}

            </label>
          </div>
        ))}
      </div>

      <div data-testid="instructions" className="recipe-instructions">
        <p>
          {currentlyCooking.strInstructions}
        </p>
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !canFinalizeRecipe }
        onClick={ handleFinalizeRecipe }
      >
        Finalizar Receita
      </button>

    </div>
  );
}

RecipeInProgress.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default RecipeInProgress;
