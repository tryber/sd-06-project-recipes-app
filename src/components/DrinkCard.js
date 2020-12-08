import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Cards.css';

function DrinkCard({ recipe, testid, idDrink }) {
  return (
    <Link to={ `/bebidas/${idDrink}` }>
      <div
        className="card-container"
        data-testid={ `${testid}-recipe-card` }
      >
        <div className="img-container">
          <img
            src={ recipe.strDrinkThumb }
            alt="Receita"
            data-testid={ `${testid}-card-img` }
          />
        </div>
        <div className="title-container">

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
  idDrink: PropTypes.string.isRequired,
};
