import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FoodCard from './FoodCard';
import FoodFilterCategories from './FoodFilterCategories';
import '../css/CardList.css';

function FoodList() {
  const {
    getFoodAPI,
    foodData,
    searchInput,
    activeFilter,
  } = useContext(RecipesContext);

  useEffect(() => {
    const { readyToSearch, filterType, query } = searchInput;

    if (readyToSearch) getFoodAPI(filterType, query);
  }, [searchInput]);

  useEffect(() => {
    const { readyToSearch } = searchInput;
    if (!readyToSearch) {
      getFoodAPI('name-filter', '');
    }
  }, []);

  const handleFoodData = () => {
    const maxSize = 12;
    const startIndex = 0;

    if (foodData.length > maxSize) {
      return foodData.slice(startIndex, maxSize).map((item, index) => (
        <FoodCard
          testid={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idMeal={ item.idMeal }
        />
      ));
    }

    if (foodData.length === 1 && activeFilter === '') {
      const { idMeal } = foodData[startIndex];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    }
    if (foodData.length > 1 && foodData.length < maxSize) {
      return foodData.map((item, index) => (
        <FoodCard
          testid={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idMeal={ item.idMeal }
        />
      ));
    }
  };

  return (
    <section className="recipe-container">
      <FoodFilterCategories />
      { handleFoodData() }
    </section>
  );
}

export default FoodList;
