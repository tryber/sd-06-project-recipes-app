import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchMealCategoryList,
  fetchDrinkCategoryList,
  fetchMealByCategory,
  fetchDrinkByCategory,
  getDrinksStart,
  initialRecipes,
} from '../services';
import RecipesContext from '../context/RecipesAppContext';
import '../Style/CategoryList.css';

function CategoryList({ title }) {
  const ZERO = 0;
  const CINCO = 5;
  const {
    categoryList,
    setCategoryList,
    setRecipes,
    setClickedCategory,
  } = useContext(RecipesContext);

  const [category, setCategory] = useState('all');

  const renderCategoryList = async (callback) => {
    const response = await callback();
    return response;
  };

  const setBase = async () => {
    const list = (title === 'Comidas')
      ? await renderCategoryList(fetchMealCategoryList)
      : await renderCategoryList(fetchDrinkCategoryList);
    setCategoryList(list);
  };

  const fetchMealOrDrink = async (actualCategory) => {
    if (title === 'Comidas') {
      if (actualCategory === 'all') await initialRecipes(setRecipes);
      else {
        const response = await fetchMealByCategory(actualCategory);
        setRecipes(response);
      }
    }
    if (title === 'Bebidas') {
      if (actualCategory === 'all') await getDrinksStart(setRecipes);
      else {
        const response = await fetchDrinkByCategory(actualCategory);
        setRecipes(response);
      }
    }
  };

  const onClick = (selectedCategory) => {
    setClickedCategory(true);
    if (selectedCategory === category) setCategory('all');
    else setCategory(selectedCategory);
  };

  useEffect(() => {
    console.log(categoryList);
    setBase();
  }, []);

  useEffect(() => {
    fetchMealOrDrink(category);
  }, [category]);

  return (
    <div className="btn-filters">
      {categoryList.slice(ZERO, CINCO).map((cat) => (
        <button
          className="btn btn-outline-dark"
          type="button"
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          onClick={ () => onClick(cat.strCategory) }
        >
          {' '}
          { cat.strCategory }
        </button>))}
      <button
        className="btn btn-outline-dark"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCategory('all') }
      >
        ALL
      </button>
    </div>
  );
}

CategoryList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategoryList;
