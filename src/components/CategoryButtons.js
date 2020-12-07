import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';

function CategoryButtons(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { resetFilter } = props;
  const { setRecipes } = useContext(ContextRecipes);
  const location = useLocation().pathname;
  const MAX_NUMBER_OF_CATEGORIES = 5;

  const fetchCategories = async () => {
    if (location.includes('comidas')) {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const responseJSON = await data.json();
      setCategories(responseJSON.meals);
    } else {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const responseJSON = await data.json();
      setCategories(responseJSON.drinks);
    }
  };

  const filterByCategory = async (category) => {
    if (location.includes('comidas')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const responseJSON = await data.json();
      setRecipes(responseJSON.meals);
    } else {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const responseJSON = await data.json();
      setRecipes(responseJSON.drinks);
    }
  };

  const handleClick = ({ target }) => {
    if (target.innerHTML === selectedCategory) {
      resetFilter();
    }
    setSelectedCategory(target.innerHTML);
    filterByCategory(target.innerHTML);
    console.log('CATEGORIA:', selectedCategory);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   setRecipes(arrayFiltered);
  // }, [arrayFiltered]);

  return (
    <div className="container-category">
      <button
        className="btn btn-light btn-sm btn-border"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => resetFilter() }
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          className="btn btn-light btn-sm btn-border category-btn-text"
          key={ index }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {category.strCategory}
        </button>
      )).filter((_, index) => index < MAX_NUMBER_OF_CATEGORIES)}
      <br />
      <br />
    </div>
  );
}

CategoryButtons.propTypes = {
  resetFilter: PropTypes.func.isRequired,
};

export default CategoryButtons;
