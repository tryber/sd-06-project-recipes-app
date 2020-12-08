import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/RecipesList.css';

function RecipesCard({ food, index }) {
  return (
    <div className="col-6 col-sm-4 col-md-3 mb-3">
      <Link to={ `/comidas/${food.idMeal}` }>
        <div
          className="card shadow"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            className="card-img-top w-50 mx-auto rounded-circle"
          />
          <div className="card-body">
            <h5
              className="card-title text-center fonte"
              data-testid={ `${index}-card-name` }
            >
              {food.strMeal}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

RecipesCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCard;
