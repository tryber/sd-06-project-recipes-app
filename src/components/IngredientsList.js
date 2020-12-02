import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getIngredients } from '../services/mealsAPI';
import { getIngredientsDrinks } from '../services/drinksAPI';
import MealsContext from '../context/MealsContext';
import '../Css/IngredientsList.css';

function IngredientsList() {
  const inicio = 0;
  const fim = 12;
  const { ingredientsExplorer, setIngredientsExplorer } = useContext(MealsContext);
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      let myCards = [];
      if (location.pathname.includes('comidas')) {
        const apiMeals = await getIngredients();
        myCards = apiMeals.map((item) => {
          const myIngredient = {
            ingredientName: item.strIngredient,
            ingredientThumb: `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`,
            redirect: '/comidas',
          };
          return myIngredient;
        });
      } else {
        const apiDrink = await getIngredientsDrinks();
        myCards = apiDrink.map((item) => {
          const myIngredient = {
            ingredientName: item.strIngredient1,
            ingredientThumb: `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png`,
            redirect: '/bebidas',
          };
          return myIngredient;
        });
      }
      setIngredientsExplorer(myCards);
    }
    fetchData();
  }, []);

  return (
    ingredientsExplorer && ingredientsExplorer.slice(inicio, fim)
      .map((item, index) => (
        <Link
          to={ `${item.redirect}` }
          key={ item.ingredientName }
        >
          <div
            data-testid={ `${index}-ingredient-card` }
            className="ingredient-card"
            key={ index }
          >
            <div className="img-container">
              <img
                src={ item.ingredientThumb }
                className="card-img"
                alt="Card"
                data-testid={ `${index}-card-img` }
              />
            </div>
            <p
              data-testid={ `${index}-card-name` }
              className="card-name"
            >
              { item.ingredientName }
            </p>
          </div>
        </Link>
      ))
  );
}

export default IngredientsList;
