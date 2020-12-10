import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  requestFoods, requestCategoryFood, filterCategoryFood,
} from '../services/requestsAPI';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

function FoodRecipesPage() {
  const [apiResult, setApiResult] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [curCategory, setCurcategory] = useState([]);
  const { hiddenInput } = useContext(RecipesContext);
  const zero = 0;
  const cinco = 5;
  const doze = 12;

  useEffect(() => {
    async function fetchData() {
      const foodResults = await requestFoods();
      setApiResult(foodResults);
      const categoryResults = await requestCategoryFood();
      setFoodCategory(categoryResults);
    }
    fetchData();
  }, []);

  async function handleClick(e) {
    const category = e.target.value;
    if (category === curCategory) {
      const response = await requestFoods();
      setCurcategory(category);
      setApiResult(response);
    } else {
      const filteredCategory = await filterCategoryFood(category);
      setCurcategory(category);
      setApiResult(filteredCategory);
    }
  }

  async function handleClickAll() {
    const response = await requestFoods();
    setApiResult(response);
    return null;
  }

  return (
    <div>
      <Header pageName="Comidas" />
      <div />

      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          value="all"
          onClick={ () => handleClickAll() }
        >
          All
        </button>
        {foodCategory.meals && foodCategory.meals.slice(zero, cinco).map((element) => (
          <button
            onClick={ (e) => handleClick(e) }
            value={ element.strCategory }
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            key={ element }
          >
            {element.strCategory}
          </button>
        ))}

      </div>
      <div>
        { !hiddenInput ? apiResult.meals && apiResult.meals
          .slice(zero, doze).map((element, idx) => (
            <FoodCard element={ element } idx={ idx } key={ element.idMeal } />)) : null }
      </div>

      <Footer />
    </div>
  );
}

export default FoodRecipesPage;
