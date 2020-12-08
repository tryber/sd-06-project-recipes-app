import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/RecomendationCard.css';

function DrinkCard({ recipe, testid, idDrink }) {
  return (
    <Link
      className="link-slide-card-container"
      to={ `/bebidas/${idDrink}` }
    >
      <div
        className="slide-card-container"
        data-testid={ `${testid}-recomendation-card` }
      >
        <div className="img-slide-container">
          <img
            src={ recipe.strDrinkThumb }
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
            { recipe.strDrink }
          </h3>
        </div>

      </div>
    </Link>
  );
}

export default DrinkCard;

DrinkCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  testid: PropTypes.number.isRequired,
  idDrink: PropTypes.number.isRequired,
};
