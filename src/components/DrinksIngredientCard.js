import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinksIngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  console.log(imageUrl);
  return (
    <div
      className="card-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <Link to="/bebidas">
        <img
          data-testid={ `${index}-card-img` }
          src={ imageUrl }
          alt="Ingrediente"
        />
      </Link>
      <h3
        data-testid={ `${index}-card-name` }
      >
        {ingredient.strIngredient1}
      </h3>
    </div>
  );
}

DrinksIngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient1: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default DrinksIngredientCard;
