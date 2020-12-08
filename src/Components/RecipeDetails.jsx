import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../Style/RecipeDetails-Progress.css';
import '../Style/carousel.css';

const RecipeDetails = () => {
  const six = 6;
  const history = useHistory();
  const {
    foodRecommendation,
    setFoodRecommendation,
    DrinkRecommendation,
    handleLikes,
    setIds,
    liked,
    setLiked,
    setDrinkRecommendation } = useContext(RecipeContext);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [recipeDetailDrink, setRecipeDetailDrink] = useState(undefined);
  const [copied, setCopied] = useState('');
  const { pathname } = history.location;
  const ids = pathname.split('/')[2];
  const kindof = pathname.split('/')[1];
  const NINE = 9;
  const TWENTY_NINE = 29;
  const FOURTY_NINE = 49;

  const THIRTY_SIX = 36;
  const TWENTY_ONE = 21;
  const FIFTY_ONE = 51;

  const getAPI = async () => {
    const food = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`);
    const recipeFood = await food.meals;
    const drink = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids}`);
    const recipeDrink = await drink.drinks;
    setRecipeDetailFood(recipeFood);
    setRecipeDetailDrink(recipeDrink);
  };

  const getRecommendation = async () => {
    const foods = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodsData = await foods.meals;
    const drinks = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await drinks.drinks;
    setFoodRecommendation(foodsData);
    setDrinkRecommendation(drinksData);
  };

  const usarNoUse = async () => {
    await getAPI();
    await getRecommendation();
    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((item) => item.id === ids);
    if (favoriteStorage.length >= 1) {
      setLiked(blackHeartIcon);
    } else {
      setLiked(whiteHeartIcon);
    }
  };

  const inProgressCheck = () => {
    if (kindof === 'comidas') {
      if (!localStorage.inProgressRecipes) {
        localStorage.inProgressRecipes = JSON.stringify({
          cocktails: {}, meals: { [ids]: ['null'] } });
      } else if (JSON.parse(localStorage.inProgressRecipes).meals[ids]) {
        // const reset = JSON.parse(localStorage.inProgressRecipes = )
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals },
          },
        );
      } else {
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals,
              [ids]: ['null'] },
          },
        );
      }
    } else if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: { [ids]: ['null'] }, meals: {} });
    } else if (JSON.parse(localStorage.inProgressRecipes).cocktails[ids]) {
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
          [ids]: ['null'] },
        },
      );
    }
  };
  useEffect(() => {
    usarNoUse();
    inProgressCheck();
  }, []);

  const handleIngredients = (recipe, initial, middle, end) => {
    const ingredients = Object.values(recipe).slice(initial, middle);
    const measures = Object.values(recipe).slice(middle, end);
    return ingredients
      .filter((recipes) => recipes !== null && recipes !== '')
      .map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${ingredient} - ${measures[index]}` }
        </li>
      ));
  };

  const handleCopy = () => {
    copy(window.location.href);
    const TWO = 2000;
    setCopied('Link copiado!');
    setInterval(() => setCopied(''), TWO);
  };

  const renderRecipe = () => {
    if (pathname === `/comidas/${ids}` && recipeDetailFood.length >= 1) {
      return recipeDetailFood.map((food, index) => (
        <div key={ index } className="details-container">
          <img
            alt="product"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <div className="details-nav">
            <button onClick={ () => handleLikes(recipeDetailFood[0]) } type="button">
              <img data-testid="favorite-btn" src={ liked } alt="favorite" />
            </button>
            <div className="name-category">
              <p
                data-testid="recipe-title"
              >
                { food.strMeal }
              </p>
              <p data-testid="recipe-category">
                {food.strCategory}
              </p>
            </div>
            <button type="button" onClick={ handleCopy }>
              <img data-testid="share-btn" src={ shareIcon } alt="share" />
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
          <div className="recipe-video">
            <video data-testid="video" width="750" height="500" controls>
              <source src={ food.strYoutube } type="video/mp4" />
              <track src={ food.strYoutube } kind="captions" />
            </video>
          </div>
          <div className="carousel scroller">
            {
              DrinkRecommendation && DrinkRecommendation.length && DrinkRecommendation
                .filter((_, indexs) => indexs < six)
                .map((drinks, indx) => (
                  <div
                    data-testid={ `${indx}-recomendation-card` }
                    key={ indx }
                    className="card"
                  >
                    <Link
                      onClick={ () => setIds(drinks.idDrink) }
                      to={ `/bebidas/${drinks.idDrink}` }
                      key={ indx }
                      className="recomendation-link"
                    >
                      <img
                        src={ drinks.strDrinkThumb }
                        data-testid={ `${indx}-card-img` }
                        alt={ drinks.strDrink }
                      />
                    </Link>
                    <p
                      data-testid={ `${indx}-recomendation-title` }
                      className="carousel-item"
                    >
                      { drinks.strDrink}
                    </p>
                  </div>
                ))
            }
          </div>
          {(JSON.parse(localStorage.inProgressRecipes).meals[ids].length > 1) ? (
            <button
              type="button"
              className="start-continue-recipe-btn"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Continue Recipe
            </button>
          ) : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-continue-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              Start Recipe
            </button>)}
        </div>
      ));
    }
    if (recipeDetailDrink !== undefined) {
      return recipeDetailDrink.map((drink, index) => (
        <div key={ index } className="details-container">
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
              <img src={ liked } data-testid="favorite-btn" alt="favorite" />
            </button>
            <div className="name-category">
              <p
                data-testid="recipe-title"
              >
                { drink.strDrink }
              </p>
              <p data-testid="recipe-category">
                {drink.strAlcoholic}
              </p>
            </div>
            <button onClick={ handleCopy } type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="share" />
            </button>
            { copied }
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
          <div className="carousel scroller">
            {
              foodRecommendation && foodRecommendation.length && foodRecommendation
                .filter((_, idx) => idx < six)
                .map((meals, ind) => (
                  <div
                    className="card"
                    data-testid={ `${ind}-recomendation-card` }
                    key="index"
                  >
                    <Link
                      onClick={ () => setIds(meals.idMeal) }
                      to={ `/comidas/${meals.idMeal}` }
                      key={ index }
                      className="recomendation-link"
                    >
                      <img
                        src={ meals.strMealThumb }
                        data-testid={ `${ind}-card-img` }
                        alt={ meals.strMeal }
                      />
                    </Link>
                    <p
                      className="carousel-item"
                      data-testid={ `${ind}-recomendation-title` }
                    >
                      { meals.strMeal}
                    </p>
                  </div>
                ))
            }
          </div>
          {(JSON.parse(localStorage.inProgressRecipes).cocktails[ids].length > 1) ? (
            <button
              type="button"
              style={ { position: 'fixed', bottom: 0 } }
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
              className="start-continue-recipe-btn"
            >
              Continue Recipe
            </button>
          ) : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: 0 } }
              onClick={ () => history.push(`${pathname}/in-progress`) }
              className="start-continue-recipe-btn"
            >
              Start Recipe
            </button>)}
        </div>
      ));
    }
  };
  return (
    <div>
      { renderRecipe() }
    </div>
  );
};

export default RecipeDetails;
