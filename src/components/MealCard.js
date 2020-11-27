import React from 'react';
import PropTypes from 'prop-types';
// teste
function MealCard(props) {
  const { meal: { strMealThumb, strMeal }, index } = props;
  console.log(index);
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt="recipeImage" />
      <h5 data-testid={ `${index}-card-name` }>{ strMeal }</h5>

    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape.isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
