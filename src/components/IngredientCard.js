import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { ingredient, index } = props;
  const { idIngredient, strIngredient, strIngredientThumb } = ingredient;
  return (
    <Link
      to={ `/ingredientes/${idIngredient}` }
      className="ingredientCard-link"
    >
      <div data-testid={ `${index}-ingredient-card` } className="ingredientCard">
        <h2
          data-testid={ `${index}-card-name` }
          className="drinkCard-title"
        >
          { strIngredient }
        </h2>
        <img
          src={ strIngredientThumb }
          alt={ `${strIngredient} photograph` }
          data-testid={ `${index}-card-img` }
          className="ingredientCard-img"
        />
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  idIngredient: PropTypes.number.isRequired,
  strIngredient: PropTypes.string.isRequired,
  strIngredientThumb: PropTypes.string.isRequired,
};
export default IngredientCard;
