import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe }) {
  const { ingredients = [], measures = [] } = recipe;
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { `${ingredient} - ${measures[index]}`}
        </li>
      ))}
    </ul>
  );
}
Ingredients.propTypes = {
  recipe: PropTypes.shape.isRequired,
};

export default Ingredients;
