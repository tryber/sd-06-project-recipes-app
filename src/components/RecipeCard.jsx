import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './recipeCard.css';

const RecipeCard = ({ recipeName, recipeImage, id, foodOrDrink, index }) => (
  <Link to={ `${foodOrDrink}/${id}` }>
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img
        data-testid={ `${index}-card-img` }
        className="smallIMG"
        src={ recipeImage }
        alt="Foto da receita"
      />
      <div className="recipe-card-tag">
        <h5 data-testid={ `${index}-card-name` }>{recipeName}</h5>
      </div>
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
