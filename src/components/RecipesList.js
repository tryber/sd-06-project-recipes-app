import React from 'react';
import PropTypes from 'prop-types';

import MealsRecipesCards from './MealsRecipesCards';
import MealsCategories from './MealsCategories';
import DrinksRecipesCards from './DrinksRecipesCards';
import DrinksCategories from './DrinksCategories';

import '../style/RecipeCards.css';

function RecipesList({ title }) {
  return (title === 'Comidas') ? (
    <div>
      <MealsCategories />
      <MealsRecipesCards />
    </div>
  ) : (
    <div>
      <DrinksCategories />
      <DrinksRecipesCards />
    </div>
  );
}

RecipesList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipesList;
