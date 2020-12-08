import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../Style/RecipeDetails-Progress.css';
// Faltando redirecionar ao clicar na imagem - browser roda mas avaliador não
const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const kindof = pathname.split('/')[1];

  const getSelectedIngredients = () => {
    if (kindof === 'comidas') {
      if (!localStorage.inProgressRecipes) {
        localStorage.inProgressRecipes = JSON.stringify({
          cocktails: {}, meals: { [id]: [] } });
        return {};
      }
      const ingredients = JSON.parse(localStorage.inProgressRecipes).meals[id];

      const objetao = {};
      ingredients.forEach((el) => {
        Object.assign(objetao, { [el]: true });
      });
      return objetao;
    }

    if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: {}, meals: { [id]: [] } });
      return {};
    }

    const ingredients = JSON.parse(localStorage.inProgressRecipes).cocktails[id];
    const objetao = {};
    ingredients.forEach((el) => {
      Object.assign(objetao, { [el]: true });
    });
    return objetao;
  };
  const [checkboxes, setCheckboxes] = useState(getSelectedIngredients());
  const [recipeDetailDrink, setRecipeDetailDrink] = useState([]);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [copied, setCopied] = useState('');
  const [disable, setDisable] = useState(true);
  const {
    handleLikes,
    liked,
    setLiked,
  } = useContext(RecipeContext);
  const NINE = 9;
  const TWENTY_NINE = 29;
  const FOURTY_NINE = 49;
  const TWENTY_EIGHT = 28;
  const THIRTY_SIX = 36;
  const TWENTY_ONE = 21;
  const FIFTY_ONE = 51;
  const THIRTY_FIVE = 35;

  const getAPI = async () => {
    const food = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeFood = await food.meals;
    const drink = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeDrink = await drink.drinks;
    setRecipeDetailDrink(recipeDrink);
    setRecipeDetailFood(recipeFood);
    if (kindof === 'comidas') {
      const ingredientKeys = Object.values(recipeFood[0])
        .filter((element, index, array) => array.indexOf(element) <= TWENTY_EIGHT
        && array.indexOf(element) >= NINE
        && element !== '');
      setFoodIngredients(ingredientKeys);
    } else {
      const ingredientKeys = Object.values(recipeDrink[0])
        .filter((element, index, array) => array.indexOf(element) <= THIRTY_FIVE
        && array.indexOf(element) >= TWENTY_ONE
        && element !== '');
      setFoodIngredients(ingredientKeys);
    }
  };

  useEffect(() => {
    const objetao = {};
    foodIngredients.forEach((foods) => {
      Object.assign(objetao, { [foods]: false });
      setCheckboxes(objetao);
      if (kindof === 'comidas') {
        JSON.parse(localStorage.inProgressRecipes).meals[id]
          .filter((fod) => fod === foods).forEach(() => {
            Object.assign(objetao, { [foods]: true });
            setCheckboxes(objetao);
          });
      } else {
        JSON.parse(localStorage.inProgressRecipes).cocktails[id]
          .filter((fod) => fod === foods).forEach(() => {
            Object.assign(objetao, { [foods]: true });
            setCheckboxes(objetao);
          });
      }
    });
  }, [foodIngredients]);

  const handleStorageProgress = () => {
    if (kindof === 'comidas') {
      if (!localStorage.inProgressRecipes) {
        localStorage.inProgressRecipes = JSON.stringify({
          cocktails: {}, meals: { [id]: [] } });
      } else if (JSON.parse(localStorage.inProgressRecipes).meals[id]) {
        // const reset = JSON.parse(localStorage.inProgressRecipes = )
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals },
          },
        );
      } else {
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals, [id]: [] },
          },
        );
      }
    } else if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: { [id]: [] }, meals: {} });
    } else if (JSON.parse(localStorage.inProgressRecipes).cocktails[id]) {
      // const reset = JSON.parse(localStorage.inProgressRecipes = )
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes).cocktails },
        },
      );
    } else {
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: [] },
        },
      );
    }
  };

  useEffect(() => {
    getAPI();
    if (!localStorage.doneRecipes) {
      localStorage.doneRecipes = JSON.stringify([]);
    }
    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((item) => item.id === id);
    if (favoriteStorage.length >= 1) {
      setLiked(blackHeartIcon);
    } else {
      setLiked(whiteHeartIcon);
    }
    handleStorageProgress();
  }, []);

  useEffect(() => {
    if (!checkboxes !== {}) {
      const values = Object.values(checkboxes);
      if (values.every((el) => el === true) === true) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [checkboxes]);
  const handleCheckbox = ({ target }) => {
    // setCheckboxes({ ...checkboxes, [target.id]: true });
    if (kindof === 'comidas') {
      if (checkboxes[target.id]) {
        const concatenando = JSON.parse(localStorage.inProgressRecipes);
        const newObj = concatenando.meals[id].filter((meal) => meal !== target.id);
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes)
              .meals,
            [id]: newObj } },
        );
        setCheckboxes({ ...checkboxes, [target.id]: false });
      } else {
        const concatenando = JSON.parse(localStorage.inProgressRecipes);
        const newObj = concatenando.meals[id].concat(target.id);
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes)
              .meals,
            [id]: newObj } },
        );
        setCheckboxes({ ...checkboxes, [target.id]: true });
      }
    } else if (checkboxes[target.id]) {
      const concatenando = JSON.parse(localStorage.inProgressRecipes);
      const newObj = concatenando.cocktails[id].filter((meal) => meal !== target.id);
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: newObj } },
      );
      setCheckboxes({ ...checkboxes, [target.id]: false });
    } else {
      const concatenando = JSON.parse(localStorage.inProgressRecipes);
      const newObj = concatenando.cocktails[id].concat(target.id);
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: newObj } },
      );
      setCheckboxes({ ...checkboxes, [target.id]: true });
    }
  };

  const handleIngredients = (recipe, initial, middle, end) => {
    const ingredients = Object.values(recipe).slice(initial, middle);
    const measures = Object.values(recipe).slice(middle, end);
    return ingredients
      .filter((recipes) => recipes !== null && recipes !== '')
      .map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label
            htmlFor={ ingredient }
          >
            <input
              style={ { textDecoration: 'none solid rgba(0,0,0)' } }
              type="checkbox"
              checked={ checkboxes[ingredient] || false }
              id={ ingredient }
              onChange={ handleCheckbox }
            />
            <span>{ `${ingredient} - ${measures[index]}` }</span>
          </label>
        </div>
      ));
  };

  const handleFinishRecipe = () => {
    const typeRecipe = pathname.split('/')[1];
    if (typeRecipe === 'comidas') {
      const data = Date();
      const doneFood = {
        id: recipeDetailFood[0].idMeal,
        type: 'comida',
        area: recipeDetailFood[0].strArea,
        category: recipeDetailFood[0].strCategory,
        alcoholicOrNot: '',
        name: recipeDetailFood[0].strMeal,
        image: recipeDetailFood[0].strMealThumb,
        doneDate: data,
        tags: recipeDetailFood[0].strTags.split(','),
      };
      const itens = JSON.parse(localStorage.doneRecipes);
      const AllFavorites = itens.concat(doneFood);
      localStorage.doneRecipes = JSON.stringify(AllFavorites);
    } else {
      const data = Date();
      const doneFood = {
        id: recipeDetailDrink[0].idDrink,
        type: 'bebida',
        area: '',
        category: recipeDetailDrink[0].strCategory,
        alcoholicOrNot: recipeDetailDrink[0].strAlcoholic,
        name: recipeDetailDrink[0].strDrink,
        image: recipeDetailDrink[0].strDrinkThumb,
        doneDate: data,
        tags: [],
      };
      const itens = JSON.parse(localStorage.doneRecipes);
      const AllFavorites = itens.concat(doneFood);
      localStorage.doneRecipes = JSON.stringify(AllFavorites);
    }
  };

  const handleCopy = () => {
    const urls = window.location.href.split('/');
    const fullUrl = `${urls[0]}//${urls[2]}/${urls[3]}/${urls[4]}`;
    copy(fullUrl);
    const TWO = 2000;
    setCopied('Link copiado!');
    setInterval(() => setCopied(''), TWO);
  };

  if (pathname === `/comidas/${id}/in-progress`) {
    return recipeDetailFood.map((food) => (
      <div key="1" className="details-container">
        <img
          alt="product"
          data-testid="recipe-photo"
          src={ food.strMealThumb }
        />
        <div className="details-nav">
          <button
            onClick={ () => handleLikes(recipeDetailFood[0]) }
            type="button"
          >
            <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
          </button>
          <div className="name-category">
            <p
              data-testid="recipe-title"
            >
              { food.strMeal }
            </p>
            <p data-testid="recipe-category">
              { food.strCategory }
            </p>
          </div>
          <button
            onClick={ handleCopy }
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="share" />
          </button>
          {copied}
        </div>
        <div className="ing-inst">
          <div className="recipe-ingredients">
            <h5>INGREDIENTS</h5>
            {
              handleIngredients(food, NINE, TWENTY_NINE, FOURTY_NINE)
            }
          </div>
          <div className="recipe-instructions">
            <h5>INSTRUCTIONS</h5>
            <p data-testid="instructions">
              { food.strInstructions }
            </p>
          </div>
        </div>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            className="start-continue-recipe-btn"
            type="button"
            disabled={ disable }
            onClick={ handleFinishRecipe }
          >
            Finish
          </button>
        </Link>
      </div>
    ));
  }
  return recipeDetailDrink.map((drink) => (
    <div key="2" className="details-container">
      <img
        alt="product"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
      />
      <div className="details-nav">
        <button
          onClick={ () => handleLikes(recipeDetailFood, recipeDetailDrink[0]) }
          type="button"
        >
          <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
        </button>
        <div className="name-category">
          <p data-testid="recipe-title">
            { drink.strDrink }
          </p>
          <p data-testid="recipe-category">
            {drink.strAlcoholic}
          </p>
        </div>
        <button
          onClick={ handleCopy }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {copied}
      </div>
      <div className="ing-inst">
        <div className="recipe-ingredients">
          <h5>INGREDIENTS</h5>
          {
            handleIngredients(drink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)
          }
        </div>
        <div className="recipe-instructions">
          <h5>INSTRUCTIONS</h5>
          <p data-testid="instructions">{ drink.strInstructions }</p>
        </div>
      </div>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          className="start-continue-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ handleFinishRecipe }
        >
          Finish
        </button>
      </Link>
    </div>
  ));
};

export default RecipeInProgress;
