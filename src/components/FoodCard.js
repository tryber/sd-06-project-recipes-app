import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Cards.css';

function FoodCard({ recipe, testid, idMeal }) {
  return (
    <Link className="Link" to={ `/comidas/${idMeal}` }>
      <div
        className="card-container"
        data-testid={ `${testid}-recipe-card` }
      >
        <div className="img-container">
          <img
            src={ recipe.strMealThumb }
            alt="Receita"
            data-testid={ `${testid}-card-img` }
          />
        </div>
        <div className="title-container">

          <h3
            data-testid={ `${testid}-card-name` }
          >
            { recipe.strMeal }
          </h3>

        </div>
      </div>
    </Link>
  );
}

export default FoodCard;

FoodCard.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  testid: PropTypes.number.isRequired,
  idMeal: PropTypes.string.isRequired,
};
