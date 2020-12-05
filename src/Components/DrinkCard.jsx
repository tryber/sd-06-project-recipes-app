import React from 'react';
import PropTypes from 'prop-types';

export default function DrinkCard({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ `${drink.strDrinkThumb}/preview` }
        alt="drink-pic"
        height="60px"
      />
      <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.objectOf({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
