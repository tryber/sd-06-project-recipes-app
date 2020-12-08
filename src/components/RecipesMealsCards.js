import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import CategoriesButtonsMeals from './CategoriesButtonsMeals';
import { loading } from '../images';
import '../style/RecipeCards.css';

function RecipesMealsCards({ categories }) {
  const { data } = useContext(RecipesContext);
  const DOZE = 12;

  if (!categories || data.length < 1) {
    return <img className="loading" src={ loading } alt="loading" />;
  }

  return (
    <div className="div-bttn-category-cards">
      {
        categories === 'none'
          ? ''
          : <CategoriesButtonsMeals categories={ categories } />
      }
      <div className="cards-div">
        <div className="card-div">
          {
            data[0].meals.filter((_, index) => index < DOZE)
              .map(({ idMeal, strMeal, strMealThumb }, index) => (
                <Link
                  key={ idMeal }
                  to={ `/comidas/${idMeal}` }
                >
                  <div data-testid={ `${index}-recipe-card` }>
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
    </div>
  );
}

RecipesMealsCards.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipesMealsCards;
