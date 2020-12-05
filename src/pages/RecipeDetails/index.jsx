import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import { useSingleRecipe } from '../../hooks/singleRecipe';
import { useCook } from '../../hooks/cook';
import { useRecipes } from '../../hooks/recipes';

import parseRecipeToFavorite from '../../utils/parseFavoriteRecipeFormat';
import parseIngredientAndMeasures from '../../utils/parseIngredientAndMeasures';

import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

import './styles.css';

function RecipeDetails({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    currentFocusedRecipes, loadSingleRecipe, loadingSingleRecipe, unloadRandom,
  } = useSingleRecipe();

  const { id } = useParams();

  const {
    startCooking, doneRecipes, recipesProgress,
  } = useCook();

  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  useEffect(() => {
    loadSingleRecipe(pageType, id);

    return unloadRandom;
  }, [id, loadSingleRecipe]);

  const handleShareClick = useCallback(() => {
    const url = `http://localhost:3000/${pageType}/${id}`;

    copy(url);

    setCopiedLink(true);
  }, [id, pageType]);

  const recipeDetails = useMemo(
    () => currentFocusedRecipes[pageType].recipe,
    [currentFocusedRecipes, pageType],
  );

  const recipeRecommendations = useMemo(
    () => currentFocusedRecipes[pageType].recommendations,
    [currentFocusedRecipes, pageType],
  );

  const recipeIngredients = useMemo(() => {
    const ingredients = parseIngredientAndMeasures(recipeDetails);

    return ingredients;
  }, [recipeDetails]);

  const recipeHasBeenStarted = useMemo(() => {
    const accessKey = (pageType === 'comidas') ? 'meals' : 'cocktails';

    const recipeStarted = recipesProgress[accessKey][id];

    return recipeStarted;
  }, [id, recipesProgress, pageType]);

  const recipeHasBeenFinished = useMemo(() => {
    const recipeHasFinished = doneRecipes.find((recipe) => recipe.id === id);

    return recipeHasFinished;
  }, [doneRecipes, id]);

  const handleStartCooking = useCallback(() => {
    startCooking(pageType, recipeDetails);
  }, [startCooking, recipeDetails, pageType]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteRecipe = parseRecipeToFavorite(pageType, recipeDetails);

    updateFavoriteRecipes(favoriteRecipe, recipeIsFavorited);
  }, [id, pageType, recipeDetails, updateFavoriteRecipes, recipeIsFavorited]);

  if (loadingSingleRecipe) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />

      <h2 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink }
      </h2>

      <p data-testid="recipe-category">
        {recipeDetails.strAlcoholic || recipeDetails.strCategory}
      </p>

      {(pageType === 'comidas') && (
        <p>{recipeDetails.strArea}</p>
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
            src={ recipeIsFavorited ? blackHeart : whiteHeart }
            alt="favorite this recipe"
            data-testid="favorite-btn"
          />
        </button>
      </div>

      <div className="recipe-ingredients">
        {recipeIngredients.map((ingredients, index) => (
          <p
            key={ ingredients }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredients}
          </p>
        ))}
      </div>

      {(pageType === 'comidas') && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            data-testid="video"
            title={ recipeDetails.strMeal }
            src={ recipeDetails.strYoutube }
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div data-testid="instructions" className="recipe-instructions">
        <p>
          {recipeDetails.strInstructions}
        </p>
      </div>

      <div className="recommendations-container">
        {recipeRecommendations.map((recommendation, index) => (
          <Link
            key={ recommendation.idDrink || recommendation.idMeal }
            to={ `/bebidas/${recommendation.idDrink}` }
            className="recommendation-card"
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
              alt={ recommendation.strDrink || recommendation.strMeal }
              data-testid={ `${index}-recomendation-image` }
            />
            <strong
              data-testid={ `${index}-recomendation-title` }
            >
              {recommendation.strDrink || recommendation.strMeal}
            </strong>
          </Link>
        ))}
      </div>

      {!recipeHasBeenFinished && (
        <Link
          to={ `/${pageType}/${id}/in-progress` }
          data-testid="start-recipe-btn"
          onClick={ handleStartCooking }
          className="start-recipe-btn"
        >
          {recipeHasBeenStarted ? 'Continuar Receita' : 'Iniciar Receita'}
        </Link>
      )}

    </div>
  );
}

RecipeDetails.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default RecipeDetails;
