import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import CategoriesButtons from './CategoriesButtons';
import '../style/RecipeCards.css';

function RecipesMealsCards({ categories }) {
  const { data } = useContext(RecipesContext);
  const DOZE = 12;

  if (!categories || data.length < 1) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="div-bttn-category">
      {
        categories === 'none'
          ? ''
          : <CategoriesButtons categories={ categories } />
      }
      <div className="card-div">
        {
          data[0].meals.filter((_, index) => index < DOZE)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link
                key={ idMeal }
                to={ `/comidas/${idMeal}` }
              >
                <div
                  type="button"
                  data-testid={ `${index}-recipe-card` }
                  className="card-recipe"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <h1 data-testid={ `${index}-card-name` }>
                    { strMeal }
                  </h1>
                </div>
              </Link>
            ))
        }
      </div>
    </div>
  );
}

RecipesMealsCards.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesMealsCards;
