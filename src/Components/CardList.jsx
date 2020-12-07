import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';

const CardList = ({ size }) => {
  const history = useHistory();
  const {
    foodRecipes,
    setIds,
    drinkRecipes } = useContext(RecipeContext);
  const { pathname } = history.location;
  const handleIds = (food) => {
    setIds(food.idMeal);
  };
  if (pathname === '/comidas' && foodRecipes) {
    return foodRecipes.filter((_, index) => index < size)
      .map((food, indexs) => (
        <div
          data-testid={ `${indexs}-recipe-card` }
          className="card-container"
          key={ indexs }
        >
          <Link
            to={ `/comidas/${food.idMeal}` }
            onClick={ () => handleIds(food) }
            key={ indexs }
            className="details-link"
          >
            <p data-testid={ `${indexs}-card-name` }>{food.strMeal}</p>
            <img
              src={ food.strMealThumb }
              data-testid={ `${indexs}-card-img` }
              alt={ food.strMeal }
            />
          </Link>
        </div>
      ));
  }
  return drinkRecipes.filter((_, index) => index < size)
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
    ));
};
export default CardList;
