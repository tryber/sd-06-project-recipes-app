import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import { fetchDrink, fetchFood } from '../servicesAPI';

function Categories({ type }) {
  const [categories, setCategories] = useState([]);
  const { setFilterRecipe, setExecuteFilter } = useContext(ReceitasContext);

  useEffect(() => {
    const firstRequestAPI = async () => {
      const response = (type === 'meals')
        ? await fetchFood('categories', '')
        : await fetchDrink('categories', '');
      setCategories(response);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const executeSetFilter = (value) => {
    setExecuteFilter(true);
    setFilterRecipe((prevState) => (prevState === value ? '' : value));
  };

  const maxCategoriesPerPage = 5;
  return (
    <div className="category-container">
      { categories.map(({ strCategory }, index) => (
        (index < maxCategoriesPerPage)
          ? (
            <button
              key={ index }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              onClick={ ({ target }) => executeSetFilter(target.value) }
            >
              { strCategory }
            </button>
          )
          : ''
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        value="All"
        onClick={ ({ target }) => executeSetFilter(target.value) }
      >
        All
      </button>
    </div>
  );
}

export default Categories;

Categories.propTypes = {
  type: propTypes.string.isRequired,
};
