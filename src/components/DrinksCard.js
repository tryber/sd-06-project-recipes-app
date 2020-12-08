import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function DrinkCard({ drink, index }) {
  return (
    <div className="col-6 col-sm-4 col-md-3 mb-3">
      <Link to={ `/bebidas/${drink.idDrink}` }>
        <div
          className="card shadow"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            className="card-img-top w-50 mx-auto rounded-circle"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <div className="card-body">
            <h5
              data-testid={ `${index}-card-name` }
              className="card-title text-center fonte"
            >
              {drink.strDrink}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
