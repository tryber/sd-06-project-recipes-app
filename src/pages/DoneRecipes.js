import React, { useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipeCard';

const DoneRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneRecipes(recipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setDoneRecipes(doneRecipes
          .filter((recipe) => recipe.type === 'comida')) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setDoneRecipes(doneRecipes
          .filter((recipe) => recipe.type === 'bebida')) }
      >
        Drinks
      </button>
      {
        doneRecipes.map((recipe, index) => (
          <DoneRecipesCard
            key={ `${recipe.id}${recipe.name}` }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </div>
  );
};

export default DoneRecipes;
