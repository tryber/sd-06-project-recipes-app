import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Recommended from '../components/Recommended';
import { fetchRecipe } from '../services/api';
import handleFavorite from '../services/storageFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import './DrinkDetails.css';

function DrinkDetails() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [copied, setCopied] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const sliceNumber = 9;
  const itemId = useLocation().pathname.slice(sliceNumber);
  const itemUrl = useLocation().pathname;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;

  function favoriteStatus(id) {
    let favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes === null) favRecipes = [];
    const favorited = favRecipes.find((item) => (item.id === id));
    if (favorited) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }

  function checkIfDone(id) {
    let doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesArray === null) doneRecipesArray = [];
    const done = doneRecipesArray.find((item) => (item.id === id));
    if (done) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj.drinks);
      setIsFetching(false);
    })();
    favoriteStatus(itemId);
    checkIfDone(itemId);
  }, []);

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const max = 15;
    for (index; index <= max; index += 1) {
      if (recipeData[`strIngredient${index}`] !== null
        && recipeData[`strIngredient${index}`] !== '') {
        ingredientsArray.push({
          ingredient: recipeData[`strIngredient${index}`],
          quantity: recipeData[`strMeasure${index}`],
        });
      }
    }
    return ingredientsArray;
  }

  const data = (isFetching) ? [{}] : recipe;
  const { strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic } = data[0];
  const ingredients = ingredientsFunc(data[0]);

  const favoriteObj = {
    id: itemId,
    type: 'bebida',
    category: strCategory,
    area: '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  function handleFavoriteClick() {
    handleFavorite(favoriteObj);
    favoriteStatus(itemId);
  }

  function handleShareClick() {
    clipboardCopy(`http://localhost:3000${itemUrl}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  return (
    <main>
      {(isFetching) ? <div>Loading recipe...</div>
        : (
          <section className="body-recipe">
            <h1 data-testid="recipe-title">
              {strDrink}
            </h1>
            <h3 data-testid="recipe-category">
              {strAlcoholic}
            </h3>
            <img
              data-testid="recipe-photo"
              className="recipe-img"
              src={ strDrinkThumb }
              alt={ `${strDrink}` }
            />
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareClick }
            >
              <img src={ shareIcon } alt="Compartilhar" />
              Compartilhar
            </button>
            {(copied) && <span>Link copiado!</span>}
            <button
              type="button"
              onClick={ handleFavoriteClick }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorite }
                alt="Favoritar"
              />
              Favoritar
            </button>
            <div>
              {ingredients.map((ingredient, index) => (
                <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {`${ingredient.ingredient} - ${(ingredient.quantity === null)
                    ? 'a pinch'
                    : ingredient.quantity}`}
                </p>
              ))}
            </div>
            <p data-testid="instructions">
              {strInstructions}
            </p>
            <Recommended />
            {(!isDone) && (
              <Link to={ `${itemUrl}/in-progress` }>
                <button
                  type="button"
                  className="start-recipe-btn"
                  data-testid="start-recipe-btn"
                >
                  Iniciar Receita
                </button>
              </Link>
            )}
          </section>
        )}
    </main>
  );
}

export default DrinkDetails;
