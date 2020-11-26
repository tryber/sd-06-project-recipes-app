import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
  const { recipe, index, alt } = props;

  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <div className="img-thumb">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid={ `${index}-card-img` }
          alt="recipe display"
        />
      </div>
      <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal || recipe.strDrink }</h3>
      <Link
        to={ `/${alt.toLowerCase()}/${recipe.idMeal || recipe.idDrink}` }
      >
        detalhes
      </Link>
    </div>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};
