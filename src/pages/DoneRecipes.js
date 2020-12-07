import React, { useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

const DoneRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);

  return (
    <div>
      <Header pageName="Receitas Feitas" />
      {doneRecipes === null
        ? <div className="default-page">You havent completed any recipe yet</div>
        : (
          <div className="default-page">
            <div className="sub-header">
              <button
                type="button"
                data-testid="filter-by-all-btn"
                onClick={ () => setDoneRecipes(recipes) }
                className="done-buttons"
              >
                All
              </button>
              <button
                type="button"
                data-testid="filter-by-food-btn"
                onClick={ () => setDoneRecipes(recipes
                  .filter((recipe) => recipe.type === 'comida')) }
                className="done-buttons"
              >
                Food
              </button>
              <button
                type="button"
                data-testid="filter-by-drink-btn"
                onClick={ () => setDoneRecipes(recipes
                  .filter((recipe) => recipe.type === 'bebida')) }
                className="done-buttons"
              >
                Drinks
              </button>
            </div>
            <div className="done-recipes-display">
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
          </div>
        )}
    </div>
  );
};

export default DoneRecipes;
