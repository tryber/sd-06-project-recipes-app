import React from 'react';
import PropTypes from 'prop-types';

export default function RecipesButtons({ setselectedFilter }) {
  return (
    <div className="bt-group">
      <button
        type="button"
        className="category-buttons"
        data-testid="filter-by-all-btn"
        onClick={ () => setselectedFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        className="category-buttons"
        data-testid="filter-by-food-btn"
        onClick={ () => setselectedFilter('Meal') }
      >
        Food
      </button>
      <button
        type="button"
        className="category-buttons"
        data-testid="filter-by-drink-btn"
        onClick={ () => setselectedFilter('Drink') }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesButtons.propTypes = {
  setselectedFilter: PropTypes.func.isRequired,
};
