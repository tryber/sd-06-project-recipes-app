import React, { useContext } from 'react';

import RecipesContext from '../context/RecipesContext';

import useCocktailApi from '../services/useCocktailApi';
import { LIST_ALL_COCKTAIL_CATEGORIES } from '../services/cocktailsKeys';

function MealsCategories() {
  const { data, error, isLoading } = useCocktailApi(LIST_ALL_COCKTAIL_CATEGORIES);
  const { setCategorie } = useContext(RecipesContext);

  const fiveCategories = 5;

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Erro: Não foi possível mostrar as categorias</p>;

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={ ({ target }) => setCategorie(target.value) }
      >
        All
      </button>
      { data ? data.filter((_, index) => index < fiveCategories)
        .map(({ strCategory }) => (
          <button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            value={ strCategory }
            onClick={ ({ target }) => setCategorie(target.value) }
          >
            { strCategory }
          </button>)) : true }
    </div>
  );
}

export default MealsCategories;
