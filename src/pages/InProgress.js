import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import whiteIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import blackIcon from '../images/blackHeartIcon.svg';
import '../Css/inProgress.css';

function InProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [ingredientsRecipe, setIngredientsRecipe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [urlWasCopyToClipboard, seturlWasCopyToClipboard] = useState(false);

  const location = useLocation();
  const { id } = useParams();

  // Check if recipe is favorite
  function verifyFavoriteRecipe() {
    const valorZero = 0;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const indexRecipe = favoriteRecipes.findIndex((item) => item.id === id);
      if (indexRecipe >= valorZero) {
        return true;
      }
    }
    return false;
  }

  // get all ingredients
  function getIngredients(recipe) {
    const fimComida = 20;
    const fimBebida = 15;
    const range = [1, fimComida];
    if (location.pathname.includes('bebidas')) {
      range[1] = fimBebida;
    }
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsOK = (storageInProgress.meals[id]
      || storageInProgress.cocktails[id] || []);
    console.log(ingredientsOK);
    let myIngredients = [];
    for (let i = range[0]; i <= range[1]; i += 1) {
      const checkOK = ingredientsOK.some(
        (item) => item.ingredient === recipe[`strIngredient${i}`],
      );
      if (recipe[`strIngredient${i}`] !== '' && recipe[`strIngredient${i}`] !== null) {
        myIngredients = [...myIngredients,
          { ingredient: recipe[`strIngredient${i}`],
            measure: recipe[`strMeasure${i}`],
            checkbox: checkOK,
          }];
      }
    }
    console.log(myIngredients);
    return myIngredients;
  }

  function updateIngredientsLocalStorage() {
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ingredientsOk = [];
    if (ingredientsRecipe) {
      ingredientsOk = ingredientsRecipe.filter((item) => item.checkbox);
    } else {
      ingredientsOk = (storageInProgress.meals[id]
        || storageInProgress.cocktails[id]);
    }
    if (location.pathname.includes('comidas')) {
      storageInProgress.meals[id] = ingredientsOk;
    } else {
      storageInProgress.cocktails[id] = ingredientsOk;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(storageInProgress));
  }

  // Get Meal recipe by API
  async function verifyRecipeMeal() {
    const recipeMeal = await getRecipeMealByIdApi(id);
    let myTags = [];
    if (recipeMeal[0].strTags !== '' && recipeMeal[0].strTags !== null) {
      myTags = recipeMeal[0].strTags.split(',');
    }
    const newRecipeMeal = {
      id: recipeMeal[0].idMeal,
      area: recipeMeal[0].strArea,
      alcoholicOrNot: '',
      image: recipeMeal[0].strMealThumb,
      name: recipeMeal[0].strMeal,
      category: recipeMeal[0].strCategory,
      tags: myTags,
      instructions: recipeMeal[0].strInstructions,
    };
    const myIngredients = getIngredients(recipeMeal[0]);
    setIngredientsRecipe(myIngredients);
    return newRecipeMeal;
  }

  // Get Drink recipe by API
  async function verifyRecipeDrink() {
    const recipeDrink = await getRecipeDrinkByIdApi(id);
    let myTags = [];
    if (recipeDrink[0].strTags !== '' && recipeDrink[0].strTags !== null) {
      myTags = recipeDrink[0].strTags.split(',');
    }
    const newRecipe = {
      id: recipeDrink[0].idDrink,
      area: '',
      alcoholicOrNot: recipeDrink[0].strAlcoholic,
      image: recipeDrink[0].strDrinkThumb,
      name: recipeDrink[0].strDrink,
      category: recipeDrink[0].strCategory,
      tags: myTags,
      instructions: recipeDrink[0].strInstructions,
    };
    const myIngredients = getIngredients(recipeDrink[0]);
    setIngredientsRecipe(myIngredients);
    return newRecipe;
  }

  // DidMount
  useEffect(() => {
    async function fetchData() {
      let newRecipe = {};
      if (location.pathname.includes('comidas')) {
        newRecipe = await verifyRecipeMeal();
      } else {
        newRecipe = await verifyRecipeDrink();
      }
      const myFavorite = verifyFavoriteRecipe();
      setIsFavorite(myFavorite);
      setRecipeInProgress(newRecipe);
      setLoading(false);
    }

    // Create Local storage if doesn't exist
    if (localStorage.getItem('inProgressRecipes') === null) {
      const newObjectInProgress = { cocktails: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObjectInProgress));
    }
    setLoading(true);
    fetchData();
  }, []);

  // Update localStorage after setIngredientsRecipe
  useEffect(() => {
    updateIngredientsLocalStorage();
  }, [ingredientsRecipe]);

  // Change Checkbox state
  const handleChange = (index) => {
    const myIngredients = [...ingredientsRecipe];
    myIngredients[index].checkbox = !ingredientsRecipe[index].checkbox;
    setIngredientsRecipe(myIngredients);
  };

  // Copy url link to clipboard
  async function copyToClipboard() {
    if (location.pathname.includes('comidas')) {
      window.navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`)
        .then(() => seturlWasCopyToClipboard(true));
    } else {
      window.navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`)
        .then(() => seturlWasCopyToClipboard(true));
    }
  }

  // Save favorite recipe in localStorage
  function FavoriteRecipeClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      let myType = 'comida';
      let myAlcoolic = '';
      if (location.pathname.includes('bebidas')) {
        myType = 'bebida';
        myAlcoolic = recipeInProgress.alcoholicOrNot;
      }
      if (!isFavorite) {
        const newFavoriteRecipe = {
          id: recipeInProgress.id,
          type: myType,
          area: recipeInProgress.area,
          category: recipeInProgress.category,
          alcoholicOrNot: myAlcoolic,
          name: recipeInProgress.name,
          image: recipeInProgress.image,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      } else {
        const arrayFavoriteRecipe = favoriteRecipes.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      }
    }
  }

  // Save done recipe in localStorage
  function doneRecipeClick() {
    const myDate = new Date().toLocaleDateString();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== undefined) {
      let myType = 'comida';
      if (location.pathname.includes('bebidas')) {
        myType = 'bebida';
      }
      const newDoneRecipe = {
        id: recipeInProgress.id,
        type: myType,
        area: recipeInProgress.area,
        category: recipeInProgress.category,
        alcoholicOrNot: recipeInProgress.alcoholicOrNot,
        name: recipeInProgress.name,
        image: recipeInProgress.image,
        tags: recipeInProgress.tags,
        doneDate: myDate,
      };
      const arrayDoneRecipe = [...doneRecipes, newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipe));
    }
  }

  // Render image
  function imgInProgress() {
    return (
      <div className="img-container">
        <img
          data-testid="recipe-photo"
          src={ recipeInProgress.image }
          alt="nome da receita"
        />
      </div>
    );
  }

  // Render title bar
  function titleInProgress() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeInProgress.name }</h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            className="app-button-transparent"
            onClick={ copyToClipboard }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            type="button"
            className="app-button-transparent"
            onClick={ FavoriteRecipeClick }
          >
            <img
              src={ isFavorite ? blackIcon : whiteIcon }
              alt="Favorite"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        { urlWasCopyToClipboard ? <h6>Link copiado!</h6> : null }
      </div>
    );
  }

  // Render category
  function categoryInProgress() {
    return (
      <div>
        <h4 data-testid="recipe-category">{ recipeInProgress.category }</h4>
      </div>
    );
  }

  // Render ingredients checkbox
  function ingredientsInProgress() {
    return (
      <div>
        <h3>Ingredients</h3>
        <form className="form-checkbox">
          {ingredientsRecipe.map((item, index) => (
            <label
              htmlFor="checkbox"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                onChange={ () => handleChange(index) }
                checked={ item.checkbox }
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              { ` ${item.ingredient} (${item.measure}) ${item.checkbox}` }
            </label>
          ))}
        </form>
      </div>
    );
  }

  // Render instructions
  function instructionsInProgress() {
    return (
      <div>
        <h3>Instrucoes</h3>
        <p
          data-testid="instructions"
        >
          {recipeInProgress.instructions}
        </p>
      </div>
    );
  }

  // Render done button
  function buttonInProgress() {
    const enableBtn = ingredientsRecipe.every((item) => item.checkbox);
    return (
      <div>
        <Link to="/receitas-feitas">
          <button
            disabled={ !enableBtn }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ doneRecipeClick }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }

  return (
    (loading || !recipeInProgress || !ingredientsRecipe)
      ? <h5>Loading...</h5>
      : (
        <div>
          { imgInProgress() }
          { titleInProgress() }
          { categoryInProgress() }
          { ingredientsInProgress() }
          { instructionsInProgress() }
          { buttonInProgress() }
        </div>
      ));
}

export default InProgress;
