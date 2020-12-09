import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import RecipesContext from '../context/Context';

import '../css/Cards.css';

export default function Cards({ id }) {
  const { items, setItems, filters } = useContext(RecipesContext);

  useEffect(() => setItems(), []);

  if (typeof items !== 'undefined') {
    if (items.drinks) {
      if (items.drinks.length === 1 && filters.searchType !== 'category') {
        return <Redirect to={ `/${id}/${items.drinks[0].idDrink}` } />;
      }
      return (
        <div className="cards-wrapper">
          {items.drinks.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idDrink}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de drink"
                />
                <p
                  className="recipe-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}
                </p>
              </div>
            </Link>
          ))}
        </div>
      );
    } if (items.meals) {
      if (items.meals.length === 1 && filters.searchType !== 'category') {
        return <Redirect to={ `/${id}/${items.meals[0].idMeal}` } />;
      }
      return (
        <div className="cards-wrapper">
          {items.meals.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idMeal}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de comida"
                />
                <p
                  className="recipe-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal}
                </p>
              </div>
            </Link>
          ))}
        </div>
      );
    } if (Array.isArray(items)) {
      return (
        <div className="cards-wrapper">
          {items.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idMeal}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de comida"
                />
                <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }
  return <div>Loading ...</div>;
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};
