import React from 'react';
import Header from '../components/Header';

const ReceitasFeitas = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  console.log(recipes);
  return ((!recipes)
    ? <h1>No Recipes Yet!</h1>
    : (
      <section>
        <Header title="Receitas Feitas" />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        {recipes.map((recipe, index) => (
          <div>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=""
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.category}
            </p>
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h3>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              // onClick={ copyToCB }
            >
              Compartilhar
            </button>
            {recipe.tags.map((tagName, index) => (
              <div
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
              </div>
            ))}
          </div>
        ))}
      </section>
    )
  );
}

export default ReceitasFeitas;
