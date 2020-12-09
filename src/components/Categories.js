import React, { useState, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import RecipesContext from '../context/Context';
import { fetchCategories } from '../helpers/Helper';

function Categories({ id }) {
  const { setFilters } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  useEffect(() => {
    async function fetchData() {
      const results = await fetchCategories(id);
      setCategories(results);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (currCategory === 'All') {
      setFilters({
        searchText: '',
        searchType: 'name',
        category: id,
      });
    } else if (currCategory !== '') {
      setFilters({
        searchText: currCategory,
        searchType: 'category',
        category: id,
      });
    }
  }, [currCategory]);

  function handleCategoryBtn(category) {
    if (currCategory !== category) {
      setCurrCategory(category);
    } else if (currCategory === category) {
      setCurrCategory('All');
    }
  }

  return (loading)
    ? ''
    : (
      <div className="categories-box">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleCategoryBtn('All') }
        >
          All
        </button>
        { categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            onClick={ () => handleCategoryBtn(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { `${category.strCategory}` }
          </button>
        )) }
      </div>
    );
}

export default Categories;

Categories.propTypes = {
  id: PropTypes.string.isRequired,
};
