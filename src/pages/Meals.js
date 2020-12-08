import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealRecipeCard from '../components/Cards';
import Context from '../context/Context';

function Meals({ history }) {
  const TRUE = true;
  const {
    ingredientExplore,
    recipes,
    recipesToRender,
    setIngredientExplore,
    categoriesToRender,
    recipesToRenderByIngredient,
  } = useContext(Context);

  useEffect(() => {
    if (ingredientExplore) {
      recipesToRenderByIngredient('meal', ingredientExplore);
      setIngredientExplore('');
    } else recipesToRender('meal');
    categoriesToRender('meal');
  }, []);

  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
      <div className="recipes-cards">
        {recipes.length === 1 ? history.push(`/comidas/${recipes[0].idMeal}`) : (
          recipes.map((meal, index) => (
            <MealRecipeCard
              key={ meal.strMeal }
              info={ meal }
              recipe="comidas"
              index={ index }
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Meals;
