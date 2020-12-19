import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

import useMealApi from '../services/useMealApi';
import { FILTER_MEAL_BY_CATEGORY, SEARCH_ALL_MEALS } from '../services/mealsKeys';

function MealsRecipesCards() {
  const { categorie } = useContext(RecipesContext);
  const filterMeals = (categorie === 'All' || categorie === '')
    ? SEARCH_ALL_MEALS
    : FILTER_MEAL_BY_CATEGORY + categorie;
  const { data, isLoading, error } = useMealApi(filterMeals);
  const twelveRecipes = 12;

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Erro: Não foi possível mostrar as receitas</p>;

  return (
    <div>
      {
        data ? data.filter((_, index) => index < twelveRecipes)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <Link
              key={ idMeal }
              to={ `/comidas/${idMeal}` }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-recipe"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
              </div>
            </Link>
          ))
          : true
      }
    </div>
  );
}

export default MealsRecipesCards;
