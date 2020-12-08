import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/RecomendationCard.css';

function FoodCard({ recipe, testid, idMeal }) {
  return (
    <Link
      className="link-slide-card-container"
      to={ `/comidas/${idMeal}` }
    >
      <div
        className="slide-card-container"
        data-testid={ `${testid}-recomendation-card` }
      >
        <div className="img-slide-container">
          <img
            src={ recipe.strMealThumb }
            alt="Receita"
            data-testid={ `${testid}-card-img` }
          />
        </div>

        <div
          className="title-slide-container"
          data-testid={ `${testid}-recomendation-title` }
        >
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
  idMeal: PropTypes.number.isRequired,
};
