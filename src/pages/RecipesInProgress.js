import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/details.css';

function RecipesInProgress() {
  const location = useLocation().pathname;
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [isFetching, setFetching] = useState(true);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  let allCheckedIngredients = [];
  if (localStorage.getItem('checkedIngredients')) {
    allCheckedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
  }
  const localStorageFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const allDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();
  const zero = 0;
  const ten = 10;

  const fetchRecipesInProgress = async () => {
    const splitUrl = location.split('/');
    const id = splitUrl[2];
    if (location.includes('comidas')) {
      const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.meals[0]);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === apiResponse.meals[0].idMeal) {
            setFavoriteRecipe(true);
          }
        });
      }
    } else {
      const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.drinks[0]);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === apiResponse.drinks[0].idDrink) {
            setFavoriteRecipe(true);
          }
        });
      }
    }
  };

  const renderLoading = () => <h1>Loading...</h1>;

  useEffect(() => {
    setFetching(true);
    fetchRecipesInProgress();
    setFetching(false);
  }, []);

  const handleClick = () => {
    let tags = [];
    if (recipeInProgress.strTags) {
      tags = recipeInProgress.strTags.split(',');
    }
    console.log(recipeInProgress.strTags);
    console.log(typeof tags);
    console.log(tags);
    const newDoneRecipe = {
      id: recipeInProgress.idMeal ? recipeInProgress.idMeal : recipeInProgress.idDrink,
      type: recipeInProgress.idMeal ? 'comida' : 'bebida',
      area: recipeInProgress.strArea,
      category: recipeInProgress.strCategory,
      alcoholicOrNot: recipeInProgress.idMeal ? recipeInProgress.strAlcoholic : '',
      name: recipeInProgress.strMeal ? recipeInProgress.strMeal
        : recipeInProgress.strDrink,
      image: recipeInProgress.strMealThumb ? recipeInProgress.strMealThumb
        : recipeInProgress.strDrinkThumb,
      doneDate: `Feita em : ${new Date().toJSON().slice(zero, ten).replace(/-/g, '/')}`,
      tags,
    };

    if (!allDoneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
    } else {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...allDoneRecipes, newDoneRecipe]));
    }
    history.push('/receitas-feitas');
  };

  const handleIngredients = (index) => {
    const ingredientMade = document.getElementById(`${index}-ingredient`);

    if (ingredientMade.style.cssText === 'text-decoration: line-through;') {
      ingredientMade.style = 'text-decoration: none';
      allCheckedIngredients.forEach((ingredient, i) => {
        if (ingredient === ingredientMade.innerHTML) {
          allCheckedIngredients.splice(i, 1);
          localStorage.setItem('checkedIngredients',
            JSON.stringify(allCheckedIngredients));
        }
      });
    } else {
      ingredientMade.style = 'text-decoration: line-through';
      allCheckedIngredients.push(ingredientMade.innerHTML);
      localStorage.setItem('checkedIngredients', JSON.stringify(allCheckedIngredients));
    }
    const allCheckBoxs = document.querySelectorAll('.checkbox');
    let count = zero;
    allCheckBoxs.forEach((checkbox) => {
      if (checkbox.checked === true) {
        count += 1;
      }
    });
    if (allCheckBoxs.length === count) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const renderIngredients = (recipeData) => {
    const arrayIngredients = [];
    const maxIngredients = 20;

    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipeData[`strIngredient${index}`] !== ''
      && recipeData[`strIngredient${index}`] !== null
      && recipeData[`strIngredient${index}`] !== undefined
      ) {
        arrayIngredients.push({
          ingredient: recipeData[`strIngredient${index}`],
          measure: recipeData[`strMeasure${index}`],
        });
      }
    }
    return arrayIngredients;
  };

  const allIngredients = renderIngredients(recipeInProgress);

  const handleShareIcon = (idRecipe, path) => {
    const fullPath = `http://localhost:3000/${path}/${idRecipe}`;
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.icons-area').appendChild(linkCopy);
  };

  const handleFavoriteRecipes = () => {
    let newFavRecipe = {};
    if (location.includes('comidas')) {
      newFavRecipe = {
        id: recipeInProgress.idMeal,
        type: 'comida',
        area: recipeInProgress.strArea,
        category: recipeInProgress.strCategory,
        alcoholicOrNot: '',
        name: recipeInProgress.strMeal,
        image: recipeInProgress.strMealThumb,
      };
    } else {
      newFavRecipe = {
        id: recipeInProgress.idDrink,
        type: 'bebida',
        area: '',
        category: recipeInProgress.strCategory,
        alcoholicOrNot: recipeInProgress.strAlcoholic,
        name: recipeInProgress.strDrink,
        image: recipeInProgress.strDrinkThumb,
      };
    }
    if (!favoriteRecipe) {
      if (!localStorageFavs) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...localStorageFavs, newFavRecipe]));
      }
      setFavoriteRecipe(true);
    } else {
      localStorageFavs.forEach((item, index) => {
        if (item.id === newFavRecipe.id) {
          localStorageFavs.splice(index, 1);
          localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavs));
        }
      });
      setFavoriteRecipe(false);
    }
  };

  const renderFood = () => (
    <div className="details-container">
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strMealThumb }
        alt="recipe-meal"
        className="img-card-details"
        // width="200px"
      />
      <h3
        data-testid="recipe-title"
        className="title"
      >
        { recipeInProgress.strMeal }

      </h3>
      <div className="sub-title">
        <h4 data-testid="recipe-category">{ recipeInProgress.strCategory }</h4>
        <div className="icons-area">
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="share icon"
            onClick={ () => handleShareIcon(recipeInProgress.idMeal, 'comidas') }
            aria-hidden="true"
            className="share-btn"
          />
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            onClick={ handleFavoriteRecipes }
            aria-hidden="true"
          />
        </div>
      </div>
      <h5 className="section-title"> Ingredients </h5>
      <section className="ingredients-area">
        {allIngredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              // id="checkbox"
              className="checkbox"
              id={ `checkbox ${index}` }
              onChange={ () => handleIngredients(index) }
            />
            <label id={ `${index}-ingredient` } htmlFor={ `checkbox ${index}` }>
              {`${ingredient.ingredient}: ${(ingredient.measure === null)
                ? 'a gosto'
                : ingredient.measure}`}
            </label>
          </div>
        ))}
      </section>
      <h5 className="section-title"> Instructions </h5>
      <span
        data-testid="instructions"
        className="ingredients-area"
      >
        { recipeInProgress.strInstructions }

      </span>
      <button
        type="button"
        className="btn btn-light btn-lg btn-block btn-init"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderDrink = () => (
    <div className="details-container">
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strDrinkThumb }
        alt="recipe-drink"
        className="img-card-details"
        // width="200px"
      />
      <h3
        data-testid="recipe-title"
        className="title"
      >
        { recipeInProgress.strDrink }

      </h3>
      <div className="sub-title">
        <h4 data-testid="recipe-category">{ recipeInProgress.strAlcoholic }</h4>
        <div className="icons-area">
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="share icon"
            onClick={ () => handleShareIcon(recipeInProgress.idDrink, 'bebidas') }
            aria-hidden="true"
            className="share-btn"
          />
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            onClick={ handleFavoriteRecipes }
            aria-hidden="true"
          />
        </div>
      </div>
      <h5 className="section-title"> Ingredients </h5>
      <section className="ingredients-area">
        {allIngredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              // id="checkbox"
              className="checkbox"
              id={ `checkbox ${index}` }
              onChange={ () => handleIngredients(index) }
            />
            <label id={ `${index}-ingredient` } htmlFor={ `checkbox ${index}` }>
              {`${ingredient.ingredient}: ${(ingredient.measure === null)
                ? 'a gosto'
                : ingredient.measure}`}
            </label>
          </div>
        ))}
      </section>
      <h5 className="section-title"> Instructions </h5>
      <span
        data-testid="instructions"
        className="ingredients-area"
      >
        { recipeInProgress.strInstructions }

      </span>
      <button
        type="button"
        className="btn btn-light btn-lg btn-block btn-init"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderRecipes = () => (
    (location.includes('comidas')) ? (renderFood()) : (renderDrink())
  );

  return (
    <div className="details-card">
      {isFetching ? renderLoading() : renderRecipes() }
    </div>
  );
}

export default RecipesInProgress;
