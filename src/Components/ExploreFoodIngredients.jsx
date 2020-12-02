import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { getAPI } from '../services/exploreRequest';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import getAPI from '../services/exploreRequest';

export default function ExploreFoodIngredients() {
  const {
    foodIngredientsCategory,
    setFoodIngredientsCategory,
    setFoodRecipes,
  } = useContext(RecipeContext);

  const getFilterFood = async (url) => {
    const newState = await recipeRequest(url);
    console.log(newState);
    await setFoodRecipes(newState.meals);
  };

  const teste = async () => {
    try {
      const results = await getAPI();
      setFoodIngredientsCategory(results.slice(0, 12));
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    teste();
  }, []);

  const renderCards = () => (
    <div className="recipes-container">
      {foodIngredientsCategory.map((ingredient, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          className="card-container"
        >
          <Link
            onClick={ () => getFilterFood(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`) }
            to="/comidas"
            key={ index }
            className="recomendation-link"
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ ingredient.strIngredient }
            />
          </Link>
          <p data-testid={ `${index}-card-name` }>
            { ingredient.strIngredient}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {!foodIngredientsCategory ? 'Loading' : renderCards()}
    </div>
  );
}

// export default ExploreFoodIngredients;
