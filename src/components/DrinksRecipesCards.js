import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

import useCocktailApi from '../services/useCocktailApi';
import {
  FILTER_COCKTAIL_BY_CATEGORY,
  SEARCH_ALL_COCKTAILS } from '../services/cocktailsKeys';

function DrinksRecipesCards() {
  const { categorie } = useContext(RecipesContext);
  const filterDrinks = (categorie === 'All' || categorie === '')
    ? SEARCH_ALL_COCKTAILS
    : FILTER_COCKTAIL_BY_CATEGORY + categorie;
  const { data, isLoading, error } = useCocktailApi(filterDrinks);
  const twelveRecipes = 12;

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Erro: Não foi possível mostrar as receitas</p>;

  return (
    <div>
      {
        data ? data.filter((_, index) => index < twelveRecipes)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Link
              key={ idDrink }
              to={ `/bebidas/${idDrink}` }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-recipe"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
              </div>
            </Link>
          ))
          : true
      }
    </div>
  );
}

export default DrinksRecipesCards;
