import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';

function ExploreDrinkIngredients() {
  const {
    drinkIngredientsCategory,
    setDrinkIngredientsCategory,
    setDrinkRecipes,
  } = useContext(RecipeContext);

  const getAPI = async () => {
    const ZERO = 0;
    const TWELVE = 12;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const json = await response.json();
    const results = await json.drinks;
    await setDrinkIngredientsCategory(results.slice(ZERO, TWELVE));
  };

  const getFilterDrink = async (url) => {
    const newState = await recipeRequest(url);
    console.log(newState);
    await setDrinkRecipes(newState.drinks);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const renderCards = () => (
    <div className="recipes-container">
      {drinkIngredientsCategory.map((ingredient, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          className="card-container"
        >
          <Link
            onClick={ () => getFilterDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`) }
            to="/bebidas"
            key={ index }
            className="recomendation-link"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ ingredient.strIngredient1 }
            />
          </Link>
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {!drinkIngredientsCategory ? 'Loading' : renderCards()}
    </div>
  );
}

export default ExploreDrinkIngredients;
