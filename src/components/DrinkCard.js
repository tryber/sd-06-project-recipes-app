import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard(props) {
  const { drink: { strDrinkThumb, strDrink }, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt="recipeImage" />
      <h5 data-testid={ `${index}-card-name` }>{ strDrink }</h5>

    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
