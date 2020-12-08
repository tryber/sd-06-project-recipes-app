import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ info, recipe, index, recomendation }) {
  const { idMeal, strMeal, strMealThumb } = info;
  const { idDrink, strDrink, strDrinkThumb } = info;

  return (
    <Link to={ recipe === 'comidas' ? `/comidas/${idMeal}` : `/bebidas/${idDrink}` }>
      <div
        className="recipe-card"
        data-testid={
          recomendation ? `${index}-recomendation-card` : `${index}-recipe-card`
        }
      >
        <img
          src={ recipe === 'comidas'
            ? `${strMealThumb}/preview`
            : `${strDrinkThumb}/preview` }
          className="thumbnail"
          alt={ recipe === 'comidas' ? strMeal : strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p
          className="recipe-card-name"
          data-testid={
            recomendation ? `${index}-recomendation-title` : `${index}-card-name`
          }
        >
          { recipe === 'comidas' ? strMeal : strDrink }
        </p>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.string.isRequired,
  recomendation: PropTypes.bool.isRequired,
};

export default Cards;
