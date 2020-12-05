import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealsIngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;

  return (
    <div
      className="card-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <Link to="/comidas">
        <img
          data-testid={ `${index}-card-img` }
          src={ imageUrl }
          alt="Ingrediente"
        />
      </Link>
      <h3
        data-testid={ `${index}-card-name` }
      >
        {ingredient.strIngredient}
      </h3>
    </div>
  );
}

MealsIngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default MealsIngredientCard;
