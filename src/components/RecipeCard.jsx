import React from 'react';
import PropTypes from 'prop-types';
import './recipeCard.css';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipeName, recipeImage, id, foodOrDrink, index }) => (
  <Link to={ `${foodOrDrink}/${id}` } className="recipe-card">
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        className="smallIMG"
        src={ recipeImage }
        alt="Foto da receita"
      />
      <h5 data-testid={ `${index}-card-name` }>{recipeName}</h5>
    </div>
  </Link>
);

RecipeCard.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
