import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Recommended from '../components/Recommended';
import { fetchRecipe } from '../services/api';
import handleFavorite from '../services/storageFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';

function InProgress() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [copied, setCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [storeIngredients, setStoreIngredients] = useState({
    meals: {},
    cocktails: {},
  });
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const zero = 0;
  const [allChecked, setAllChecked] = useState(zero);
  const itemId = useLocation().pathname.match(/[0-9]/g).join('');
  const itemUrl = useLocation().pathname;
  const isFood = (itemUrl.includes('/comidas/'));
  const url = (isFood
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`);
  const two = 2;

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

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const maxFoodIng = 20;
    const maxDrinkIng = 15;
    const max = isFood ? maxFoodIng : maxDrinkIng;
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
  const { strMeal = '',
    strDrink = '',
    strCategory = '',
    strAlcoholic = '',
    strArea = '',
    strInstructions,
    strYoutube = '',
    strMealThumb = '',
    strDrinkThumb = '',
    strTags = [] } = data[0];
  const vidUrl = strYoutube.replace(/watch\?v=/g, '/embed/');
  const ingredients = ingredientsFunc(data[0]);

  const favoriteObj = {
    id: itemId,
    type: isFood ? 'comida' : 'bebida',
    area: isFood ? strArea : '',
    alcoholicOrNot: isFood ? '' : strAlcoholic,
    category: strCategory,
    name: isFood ? strMeal : strDrink,
    image: isFood ? strMealThumb : strDrinkThumb,
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getUTCFullYear();
  const dateFinished = `${day}/${month}/${year}`;

  const recipeTags = (typeof (strTags) === 'string') ? strTags.split(',', two) : [];

  const finishedRecipe = {
    id: itemId,
    type: isFood ? 'comida' : 'bebida',
    area: isFood ? strArea : '',
    alcoholicOrNot: isFood ? '' : strAlcoholic,
    category: strCategory,
    name: isFood ? strMeal : strDrink,
    image: isFood ? strMealThumb : strDrinkThumb,
    tags: isFood ? recipeTags : [],
    doneDate: dateFinished,
  };

  function handleFavoriteClick() {
    handleFavorite(favoriteObj);
    favoriteStatus(itemId);
  }

  function handleShareClick() {
    if (isFood) clipboardCopy(`http://localhost:3000/comidas/${itemId}`);
    if (!isFood) clipboardCopy(`http://localhost:3000/bebidas/${itemId}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  function handleCheckboxClick(e) {
    const box = e.target;
    if (!box.checked) {
      box.removeAttribute('checked');
    } else {
      box.setAttribute('checked', 'true');
    }
    if (!box.checked) {
      setAllChecked(allChecked - 1);
    } else {
      setAllChecked(allChecked + 1);
    }
    if (checkedIngredients.includes(box.value)) {
      setCheckedIngredients(checkedIngredients.filter((name) => name !== box.value));
    } else {
      setCheckedIngredients([...checkedIngredients, box.value]);
    }

    if (checkedIngredients.length > zero) {
      if (isFood) {
        setStoreIngredients({ ...storeIngredients,
          meals: { [itemId]: checkedIngredients },
        });
        localStorage.setItem('inProgressRecipes', JSON.stringify(storeIngredients));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { [itemId]: checkedIngredients },
        }));
      }
    }
  }

  const title = isFood ? strMeal : strDrink;
  const recCategory = isFood ? strCategory : strAlcoholic;
  const thumbnail = isFood ? strMealThumb : strDrinkThumb;

  function video() {
    return (
      <div>
        <iframe
          data-testid="video"
          src={ vidUrl }
          title={ title }
        />
      </div>
    );
  }

  function ingredientsList() {
    return (
      ingredients.map((ingredient, index) => (
        <div
          className="ingredients-div"
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            className="ingredient-checkbox"
            id={ `${index}-${ingredient.ingredient}` }
            key={ index }
            onChange={ handleCheckboxClick }
            value={ ingredient.ingredient }
          />
          <label key={ index } htmlFor={ `${index}-${ingredient.ingredient}` }>
            {`${ingredient.ingredient} - ${(ingredient.quantity === null)
              ? 'a pinch'
              : ingredient.quantity}`}
          </label>
        </div>
      ))
    );
  }

  function finishRecipe(finishedObj) {
    let finishedArray = JSON.parse(localStorage.getItem('doneRecipes'));
    const magicNumber = -1;
    if (finishedArray === null) finishedArray = [];
    const index = finishedArray.map((obj) => obj.id).indexOf(finishedObj.id);
    if (index === magicNumber) finishedArray.push(finishedObj);
    localStorage.setItem('doneRecipes', JSON.stringify(finishedArray));
  }

  function handleFinishRecipe() {
    finishRecipe(finishedRecipe);
  }

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj[isFood ? 'meals' : 'drinks']);
      setIsFetching(false);
    })();
    favoriteStatus(itemId);
    if (allChecked === ingredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [allChecked]);

  return (
    <div className="food-container">
      <Header title="Em Andamento" />
        {(isFetching) ? <div>Loading recipe...</div>
          : (
            <section className="mobile-container">
              <header className="recipe-head">
              <div>
                <h1
                  className="recipe-title"
                  data-testid="recipe-title"
                >
                  { title }
                </h1>
              </div>
              <div>
                <h3
                  className="recipe-category"
                  data-testid="recipe-category"
                >
                  { recCategory }
                </h3>
              </div>
            </header>
              <img
                data-testid="recipe-photo"
                className="recipe-img"
                src={ thumbnail }
                alt={ `${title}` }
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
              {isFood && video()}
              {ingredientsList()}
              <p className="recipe-instructions" data-testid="instructions">
                {strInstructions}
              </p>
              <Recommended />
              <Link to="/receitas-feitas">
                <button
                  type="button"
                  className="start-recipe-btn"
                  data-testid="finish-recipe-btn"
                  disabled={ isDisabled }
                  onClick={ handleFinishRecipe }
                >
                  Finalizar Receita
                </button>
              </Link>
            </section>
          )}
      <Footer />
    </div>
  );
}

export default InProgress;
