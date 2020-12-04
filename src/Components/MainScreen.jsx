import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import '../Style/mainScreen.css';

export default function MainScreen() {
  const history = useHistory();
  const {
    foodRecipes,
    drinkRecipes,
    isLoading,
    foodFilter,
    drinkFilter,
    setDrinkRecipes,
    setIds,
    setFoodRecipes } = useContext(RecipeContext);
  const twelve = 12;
  const five = 5;
  const { pathname } = history.location;
  const [buttonClicked, setButtonClicked] = useState('');

  const handleFilters = async ({ target }) => {
    if (target.id === 'all' && pathname === '/comidas') {
      const data = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      await setFoodRecipes(data.meals);
      setButtonClicked('all');
    } else if (target.id === 'all' && pathname === '/bebidas') {
      const data = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      await setDrinkRecipes(data.drinks);
      setButtonClicked('all');
    } else if (pathname === '/comidas' && buttonClicked === target.id) {
      const data = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      await setFoodRecipes(data.meals);
      setButtonClicked('all');
    } else if (pathname === '/comidas') {
      const data = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`);
      await setFoodRecipes(data.meals);
      setButtonClicked(`${target.id}`);
    } else if (pathname === '/bebidas' && buttonClicked === target.id) {
      const data = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      await setDrinkRecipes(data.drinks);
      setButtonClicked('all');
    } else if (pathname === '/bebidas') {
      const data = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`);
      await setDrinkRecipes(data.drinks);
      setButtonClicked(`${target.id}`);
    }
  };

  const renderFilters = () => {
    if (pathname === '/comidas') {
      return (
        <div className="filter-container">
          <button
            type="button"
            className="filter-button"
            onClick={ handleFilters }
            id="all"
            data-testid="All-category-filter"
          >
            All
          </button>
          {foodFilter.filter((_, index) => index < five)
            .map((filter, index) => (
              <button
                type="button"
                className="filter-button"
                data-testid={ `${filter.strCategory}-category-filter` }
                key={ index }
                id={ filter.strCategory }
                onClick={ handleFilters }
              >
                {filter.strCategory}
              </button>

            ))}
        </div>
      );
    }
    if (pathname === '/bebidas') {
      return (
        <div className="filter-container">
          <button
            type="button"
            className="filter-button"
            onClick={ handleFilters }
            id="all"
            data-testid="All-category-filter"
          >
            All
          </button>
          { drinkFilter.filter((_, index) => index < five)
            .map((filter, index) => (
              <button
                type="button"
                className="filter-button"
                data-testid={ `${filter.strCategory}-category-filter` }
                key={ index }
                id={ filter.strCategory }
                onClick={ handleFilters }
              >
                {filter.strCategory}
              </button>
            ))}
        </div>
      );
    }
  };
  const handleIds = (food) => {
    setIds(food.idMeal);
  };

  const renderCards = () => {
    if (pathname === '/comidas' && foodRecipes) {
      return foodRecipes.filter((_, index) => index < twelve)
        .map((food, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card-container"
            key={ index }
          >
            <Link
              to={ `/comidas/${food.idMeal}` }
              onClick={ () => handleIds(food) }
              key={ index }
              className="details-link"
            >
              <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
              <img
                src={ food.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ food.strMeal }
              />
            </Link>
          </div>
        ));
    }
    return (drinkRecipes.filter((_, index) => index < twelve)
      .map((drinks, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
          className="card-container"
        >

          <Link
            onClick={ () => setIds(drinks.idDrink) }
            to={ `/bebidas/${drinks.idDrink}` }
            className="details-link"
          >

            <p data-testid={ `${index}-card-name` }>{ drinks.strDrink}</p>
            <img
              src={ drinks.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ drinks.strDrink }
            />
          </Link>
        </div>
      )));
  };

  return (
    <div>
      {renderFilters()}
      <div className="recipes-container">
        { isLoading ? <p>Loading...</p> : renderCards() }
      </div>
    </div>);
}
