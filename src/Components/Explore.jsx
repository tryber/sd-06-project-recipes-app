import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import recipeRequest from '../services/recipeRequest';

const Explore = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);

  const getAPI = async () => {
    const food = await recipeRequest('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomFoodID = await food.meals[0];
    setRandomFood(randomFoodID);
    const drink = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const randomDrinkID = await drink.drinks[0];
    setRandomDrink(randomDrinkID);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const redirect = () => {
    if (pathname === '/explorar/comidas') {
      return (
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>

          <Link
            to={ `/comidas/${randomFood.idMeal}` }
          >
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>);
    }

    if (pathname === '/explorar/bebidas') {
      return (
        <div>
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link
            to={ `/bebidas/${randomDrink.idDrink}` }
          >
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>);
    }
  };
  return (
    <div>
      {redirect()}
    </div>
  );
};

export default Explore;
