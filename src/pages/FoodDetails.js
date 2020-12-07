import React, { useContext, useEffect } from 'react';
// Carousel lib imports
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import RecipesContext from '../context/RecipesContext';
import FetchApiFood from '../services/FetchApiFood';
import FetchApiDrink from '../services/FetchApiDrink';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import {
  CardDetailsContainer,
  ButtonsRecipe,
  ShareAndLikeButtons } from '../styles/detailsFoodDrink';

function FoodDetails() {
  // state que guarda o retorno da requisição
  const {
    foodDetail,
    setFoodDetail,
    recomendedDrink,
    setRecomendedDrink,
    recipeState,
    setRecipeState,
    isFavorite,
    setFavorite } = useContext(RecipesContext);

  const maxRecomended = 6;
  const minRecomended = 0;

  function isFavorited() {
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipes) {
      getFavoriteRecipes.find((recipe) => recipe.id === RecipeID);
      setFavorite(true);
    }
  }

  useEffect(() => {
    // código esperto para pegar somente o id no final da url
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    FetchApiFood('6', setFoodDetail, RecipeID);
    FetchApiDrink('2', setRecomendedDrink, foodDetail.strMeal);
    isFavorited();
  }, []);

  function renderIngredients() {
    const ingredientArray = [];
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (foodDetail[0][`strIngredient${i}`] === '') {
        break;
      }
      ingredientArray.push({
        ingredientes: foodDetail[0][`strIngredient${i}`],
        medidas: foodDetail[0][`strMeasure${i}`] });
    }

    return ingredientArray.map((ingredient, index) => (
      <ul key={ index }>
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`Ingredient: ${ingredient.ingredientes} Measure: ${ingredient.medidas}`}
        </li>
      </ul>
    ));
  }

  // O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
  // O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";

  // Essa função gerencia o estado da receita
  function handleRecipeState() {
    setRecipeState({ ...recipeState, ReceitaIniciada: true });
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);

    window.location.pathname = `/comidas/${RecipeID}/in-progress`;
  }

  function handleShareButton() {
    const copyText = window.location.href;
    window.navigator.clipboard.writeText(copyText);
  }

  function handleFavoriteButton() {
    const favObj = {
      favoriteRecipes: [{
        id: foodDetail[0].idMeal,
        type: 'comida',
        area: foodDetail[0].strArea,
        category: foodDetail[0].strCategory,
        alcoholicOrNot: '',
        name: foodDetail[0].strMeal,
        image: foodDetail[0].strMealThumb,
      }],
    };

    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];

    currentFavoriteRecipes.push(favObj.favoriteRecipes[0]);

    currentFavoriteRecipes.concat(JSON.parse(localStorage.getItem('favoriteRecipes')));

    localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavoriteRecipes));
    isFavorited();
  }

  function handleUnfavoriteButton() {
    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];

    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);

    currentFavoriteRecipes.filter((favoriteRecipe) => (
      favoriteRecipe.id === RecipeID
        ? currentFavoriteRecipes.indexOf(favoriteRecipe) : null
    ));

    setFavorite(false);
  }

  return (
    foodDetail.map((food, index) => (
      <div key={ index }>
        <CardDetailsContainer>

          <h2 data-testid="recipe-title">{`[  ${food.strMeal}  ]`}</h2>
          {food.Category !== 'Vegetarian'
            ? <h3 data-testid="recipe-category">Vegetarian: no</h3>
            : <h3 data-testid="recipe-category">Vegetarian: yes</h3>}

          <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />

          <p data-testid="instructions">{food.strInstructions}</p>

          <iframe
            title="youtube-video"
            width="300"
            height="300"
            data-testid="video"
            src={ food.strYoutube }
          />

          <div>
            {foodDetail.length === 1 ? renderIngredients() : null}
          </div>

          <h4>[ Recomendadas ]</h4>

          <Carousel arrows>
            {recomendedDrink.length >= maxRecomended
              ? recomendedDrink.map((recomendation, index4) => (
                <img
                  key={ index4 }
                  src={ recomendation.strDrinkThumb }
                  alt="recomendation"
                />
              )).slice(minRecomended, maxRecomended) : null }
          </Carousel>

          <ButtonsRecipe
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-btn"
            onClick={ handleRecipeState }
          >
            {recipeState.ReceitaIniciada ? 'Continuar Receita' : 'Iniciar Receita'}
          </ButtonsRecipe>

          <ShareAndLikeButtons>
            <input
              type="image"
              className="btn-share"
              data-testid="share-btn"
              onClick={ handleShareButton }
              src={ shareIcon }
              alt="share"
            />

            { isFavorite ? <input
              type="image"
              className="btn-favorite-right"
              data-testid="favorite-btn"
              onClick={ handleUnfavoriteButton }
              src={ blackHeartIcon }
              alt="favorite"
            /> : <input
              type="image"
              className="btn-favorite-right"
              data-testid="favorite-btn"
              onClick={ handleFavoriteButton }
              src={ whiteHeartIcon }
              alt="favorite"
            />}
          </ShareAndLikeButtons>
        </CardDetailsContainer>
      </div>
    ))
  );
}

export default FoodDetails;
