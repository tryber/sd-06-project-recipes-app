import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import recipeRequest from '../services/recipeRequest';
import exploreIngredients from '../images/exploreIng.png';
import exploreOrigin from '../images/exploreOrigin.png';
import exploreSurprise from '../images/exploreSurprise.png';

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
          <Link
            to="/explorar/comidas/ingredientes"
            data-testid="explore-by-ingredient"
            className="explore-btn"
          >
            <img src={ exploreIngredients } alt="Explore by ingredients" />
            Por Ingredientes
          </Link>
          <Link
            to="/explorar/comidas/area"
            data-testid="explore-by-area"
            className="explore-btn"
          >
            <img src={ exploreOrigin } alt="Explore by Origin Place" />
            Por Local de Origem
          </Link>

          <Link
            to={ `/comidas/${randomFood.idMeal}` }
            data-testid="explore-surprise"
            className="explore-btn"
          >
            <img src={ exploreSurprise } alt="Surprise me" />
            Me Surpreenda!
          </Link>
        </div>);
    }

    if (pathname === '/explorar/bebidas') {
      return (
        <div>
          <Link
            to="/explorar/bebidas/ingredientes"
            data-testid="explore-by-ingredient"
            className="explore-btn"
          >
            <img src={ exploreIngredients } alt="Explore by Ingredients" />
            Por Ingredientes
          </Link>
          <Link
            to={ `/bebidas/${randomDrink.idDrink}` }
            data-testid="explore-surprise"
            className="explore-btn"
          >
            <img src={ exploreSurprise } alt="Surprise me" />
            Me Surpreenda!
          </Link>
        </div>);
    }
  };
  return (
    <div>
      { redirect() }
    </div>
  );
};

export default Explore;
