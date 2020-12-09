import React, { useState, useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getMealsAPI, getDrinksApi } from '../../services/API';

const CategoryDisplay = () => {
  const [categoryes, setCategoryes] = useState([]);
  const { selectedCategory, setSelectedCategory, navCategory, setNavCategory } = useContext(Context);

  const { pageTitle } = useContext(Context);

  useEffect(() => {
    if (pageTitle === 'Meals') {
      getMealsAPI('c=list', 'category').then((data) => {
        setCategoryes(data);
      });
    } else if (pageTitle === 'Drinks') {
      getDrinksApi('c=list', 'category').then((data) => {
        setCategoryes(data);
      });
    }
  }, [pageTitle]);

  function handleSelectCategory(event) {
    const { target } = event;
    const { value } = target;
    if (event.target.value === '') {
      setNavCategory('All');
    } else {
      setNavCategory(event.target.value);
    }
    if (selectedCategory === '' || value !== selectedCategory) {
      setSelectedCategory(value);
    } else {
      setSelectedCategory('');
    }
  }

  return (
    <div className="category-container">
      <div key="All-categories" className="th-category">
        <button
          className={ `btn btn-small fixed-size ${(navCategory === 'All') ? 'btn-active' : ''}` }
          type="button"
          value=""
          data-testid="All-category-filter"
          onClick={ (event) => handleSelectCategory(event) }
        >
          All
        </button>
      </div>
      {categoryes
        .map(
          (category, index) => {
            const CATEGORY_NUMBER = 5;
            while (index < CATEGORY_NUMBER) {
              return (
                <div key={ category.strCategory } className="th-category">
                  <button
                    className={`btn btn-small fixed-size ${(navCategory === category.strCategory) ? 'btn-active' : ''}` }
                    type="button"
                    value={ category.strCategory }
                    data-testid={ `${category.strCategory}-category-filter` }
                    onClick={ (event) => handleSelectCategory(event) }
                  >
                    {category.strCategory}
                  </button>
                </div>
              );
            }
            return undefined;
          },
        )}
    </div>
  );
};

export default CategoryDisplay;
