import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import { Header, Footer } from '.';
import '../Style/mainScreen.css';

function ExploreFoodIngredients() {
  const {
    foodIngredientsCategory,
    setFoodIngredientsCategory,
    setFoodRecipes,
  } = useContext(RecipeContext);

  const getAPI = async () => {
    const ZERO = 0;
    const TWELVE = 12;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const json = await response.json();
    const results = await json.meals;
    await setFoodIngredientsCategory(results.slice(ZERO, TWELVE));
  };

  const getFilterFood = async (url) => {
    const newState = await recipeRequest(url);
    console.log(newState);
    await setFoodRecipes(newState.meals);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const EIGHTY = 80;
  const px = 'px';
  const renderCards = () => (
    <div className="recipes-container" style={ { marginTop: EIGHTY + px } }>
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
            className="details-link"
          >
            <p data-testid={ `${index}-card-name` }>
              { ingredient.strIngredient}
            </p>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ ingredient.strIngredient }
            />
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Header pageName="Explore Ingredients" />
      {!foodIngredientsCategory ? 'Loading' : renderCards()}
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
