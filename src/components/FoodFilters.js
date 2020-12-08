import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { foodByCategoryApi, foodAPI, foodCategoryApi } from '../services/foodAPI';

function FoodFilters() {
  const {
    filtersData, setMeals, selectedFilter, setSelectedFilter, setFiltersData,
  } = useContext(ReceitasContext);

  useEffect(() => {
    async function fetchMeal() {
      const data = await foodCategoryApi();

      setFiltersData(data);
    }

    fetchMeal();
  }, []);

  async function fetchFood() {
    const responseFoodApi = await foodAPI();
    setMeals(responseFoodApi);
  }

  const filters = (category) => {
    if (category === 'All') {
      fetchFood();
    } else {
      foodByCategoryApi(category).then((response) => {
        setMeals(response.meals);
      });
    }
  };

  const filterByCategory = (category) => {
    if (category !== selectedFilter) {
      filters(category);
      setSelectedFilter(category);
    } else {
      fetchFood();
      setSelectedFilter('All');
    }
  };

  return (
    <div className="row justify-content-center mb-2">
      {filtersData.map((filter) => (
        <button
          key={ filter }
          type="button"
          data-testid={ `${filter}-category-filter` }
          className="btn m-1 col-3"
          style={ { background: '#7ed957', color: 'black' } }
          onClick={ (event) => filterByCategory(event.target.innerHTML) }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FoodFilters;
