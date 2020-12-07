import React, { useContext, useEffect } from 'react';
// Carousel lib imports
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import RecipesContext from '../context/RecipesContext';
import FetchApiDrink from '../services/FetchApiDrink';
import FetchApiFood from '../services/FetchApiFood';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import {
  CardDetailsContainer,
  ButtonsRecipe,
  ShareAndLikeButtons } from '../styles/detailsFoodDrink';

function DrinkDetails() {
  // state que guarda o retorno da requisição
  const {
    drinkDetail,
    setDrinkDetail,
    recomendedFood,
    setRecomendedFood,
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
    FetchApiDrink('6', setDrinkDetail, RecipeID);
    FetchApiFood('2', setRecomendedFood, drinkDetail.strMeal);
    isFavorited();
  }, []);

  function renderIngredients() {
    const ingredientArray = [];
    const vinte = 20;

    for (let i = 1; i <= vinte; i += 1) {
      if (drinkDetail[0][`strIngredient${i}`] === ''
      || drinkDetail[0][`strIngredient${i}`] === null) {
        break;
      }

      ingredientArray.push({
        ingredientes: drinkDetail[0][`strIngredient${i}`],
        medidas: drinkDetail[0][`strMeasure${i}`] });
    }

    return ingredientArray.map((ingredient, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`Ingredient: ${ingredient.ingredientes} Measure: ${ingredient.medidas}`}
      </p>
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

    window.location.pathname = `/bebidas/${RecipeID}/in-progress`;
  }

  function handleShareButton() {
    const copyText = window.location.href;
    window.navigator.clipboard.writeText(copyText);
  }

  function handleFavoriteButton() {
    const drinkObj = {
      favoriteRecipes: [{
        id: drinkDetail[0].idDrink,
        type: 'bebida',
        area: '',
        category: drinkDetail[0].strCategory,
        alcoholicOrNot: drinkDetail[0].strAlcoholic,
        name: drinkDetail[0].strDrink,
        image: drinkDetail[0].strDrinkThumb,
      }],
    };

    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];

    currentFavoriteRecipes.push(drinkObj.favoriteRecipes[0]);

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
    drinkDetail.map((drink, index) => (
      <div key={ index }>
        <CardDetailsContainer>

          <h2 data-testid="recipe-title">{[`${drink.strDrink}`]}</h2>
          <h2 data-testid="recipe-category">{`[${drink.strCategory}]`}</h2>
          { drink.strAlcoholic !== drink.strAlcoholic.includes('Alcoholic')
            ? <h3 data-testid="recipe-category">Alcoholic: yes</h3>
            : <h3 data-testid="recipe-category">Alcoholic: no</h3>}

          <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />

          <p data-testid="instructions">{drink.strInstructions}</p>

          <iframe
            title="youtube-video"
            width="300"
            height="300"
            data-testid="video"
            src={ drink.strVideo }
          />

          <div>
            {drinkDetail.length === 1 ? renderIngredients() : null}
          </div>

          <h4>[ Recomendadas ]</h4>

          <Carousel arrows>
            {recomendedFood.length >= maxRecomended
              ? recomendedFood.map((recomendation, index4) => (
                <img
                  key={ index4 }
                  src={ recomendation.strMealThumb }
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

export default DrinkDetails;
