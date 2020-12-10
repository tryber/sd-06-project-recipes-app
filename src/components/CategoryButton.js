import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

export default function CategoryButton() {
  const [selectedButton, setSelectedButton] = useState('All');
  const { foods, categories, fetchCategories, searchParam,
    setSearchParam, fetchByCategory, fetchApi } = useContext(RevenueContext);

  const location = useLocation();
  const idRecipe = location.pathname.split('/');
  let foodOrDrink;
  if (idRecipe[1] === 'comidas') {
    setSearchParam('Meal');
    foodOrDrink = 'meals';
  }
  if (idRecipe[1] === 'bebidas') {
    setSearchParam('Drink');
    foodOrDrink = 'drinks';
  }

  let generalAPI;
  let linkCategoriesAPI;
  let linkByCategoryAPI;
  if (searchParam === 'Meal') {
    generalAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    linkCategoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    linkByCategoryAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  } else {
    generalAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    linkCategoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    linkByCategoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  }

  useEffect(() => {
    fetchCategories(linkCategoriesAPI);
  }, [searchParam, foods]);

  const filterByCategory = (category, linkAPI) => {
    if (category !== selectedButton) {
      setSelectedButton(category);
      fetchByCategory(linkAPI);
    } else {
      setSelectedButton('All');
      fetchApi(generalAPI);
    }
  };

  const noFilters = () => {
    setSelectedButton('All');
    fetchApi(generalAPI);
  };

  const renderCategories = () => {
    if (categories[foodOrDrink]) {
      const CINCO = 5;
      let toggleClass = (selectedButton === 'All') ? 'selected-category' : '';
      return (
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          <button
            className={ `bt-categories ${toggleClass}` }
            type="button"
            onClick={ noFilters }
            data-testid="All-category-filter"
          >
            All
          </button>
          {categories[foodOrDrink].map((category, index) => {
            if (index < CINCO) {
              const linkAPI = `${linkByCategoryAPI}${category.strCategory}`;
              toggleClass = (selectedButton === category.strCategory)
                ? 'selected-category' : '';
              return (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  className={ `bt-categories ${toggleClass}` }
                  type="button"
                  onClick={ () => filterByCategory(category.strCategory, linkAPI) }
                >
                  {category.strCategory.split('/')[0]}
                </button>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {(categories) ? renderCategories() : 'Loading...'}
    </div>
  );
}
