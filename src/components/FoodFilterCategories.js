import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../css/CategoryFilters.css';

function FoodFilterCategories({ categories }) {
  const {
    filteredList,
    getFoodList,
    getFoodAPI,
    setActiveFilter,
    activeFilter,
  } = useContext(RecipesContext);

  useEffect(() => {
    getFoodList('category-list');
  }, []);

  const onClick = (value) => {
    if (value === 'All' || activeFilter === value) {
      getFoodAPI('name-filter', '');
      setActiveFilter('All');
    } else {
      getFoodAPI('category-filter', value);
      setActiveFilter(value);
    }
  };

  return categories !== null && (
    <div className="category-filter-container">
      <button
        className="btn-filter"
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={ ({ target: { value } }) => onClick(value) }
      >
        All
      </button>
      {filteredList !== null && filteredList.map((category, index) => (
        <button
          className="btn-filter"
          data-testid={ `${category}-category-filter` }
          onClick={ ({ target: { value } }) => onClick(value) }
          type="button"
          value={ category }
          key={ `${index}-${category}` }
        >
          { category }
        </button>
      ))}
    </div>
  );
}

export default FoodFilterCategories;

FoodFilterCategories.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
};
