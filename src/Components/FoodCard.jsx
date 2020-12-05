import React from 'react';
import PropTypes from 'prop-types';

export default function FoodCard({ food, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ `${food.strMealThumb}/preview` }
        data-testid={ `${index}-card-img` }
        alt="food-pic"
        height="60px"
      />
      <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
    </div>
  );
}

FoodCard.propTypes = {
  food: PropTypes.objectOf({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
