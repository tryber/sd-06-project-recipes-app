import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/index';
import AppContext from '../context/AppContext';

function NavigationMenu(props) {
  const { page } = props;
  const { options, setOptions } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const maxCategories = 5;

  const getCategories = async () => {
    let list;
    if (page === 'Comidas') {
      list = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategories(list.meals);
    }
    if (page === 'Bebidas') {
      list = await fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategories(list.drinks);
    }
  };

  const goToCategory = (category) => {
    if (options.category === category) {
      setOptions({ ...options, category: '' });
    } else {
      setOptions({ ...options, category });
    }
  };

  useEffect(() => {
    getCategories();
  }, [page]);

  return (
    <div className="categories">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => goToCategory('') }
      >
        All
      </button>
      {categories
        .filter((e, index) => e && index < maxCategories)
        .map((meal, index) => (
          <button
            data-testid={ `${meal.strCategory}-category-filter` }
            className="categ-buttons"
            type="button"
            key={ index }
            onClick={ () => goToCategory(meal.strCategory) }
          >
            { meal.strCategory }
          </button>))}
    </div>
  );
}

NavigationMenu.propTypes = {
  page: PropTypes.string.isRequired,
};

export default NavigationMenu;
