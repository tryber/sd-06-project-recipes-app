import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  requestDrinks, requestCategoryDrink, filterCategoryDrinks,
} from '../services/requestsAPI';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';

function DrinksRecipesPage() {
  const [apiResult, setApiResult] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [curCategory, setCurcategory] = useState([]);
  const { hiddenInput } = useContext(RecipesContext);
  const zero = 0;
  const doze = 12;
  const cinco = 5;

  useEffect(() => {
    async function fetchData() {
      const response = await requestDrinks();
      setApiResult(response);
      const categoryResults = await requestCategoryDrink();
      setDrinkCategory(categoryResults);
    }
    fetchData();
  }, []);

  async function handleClick(e) {
    const category = e.target.value;
    if (category === curCategory) {
      const response = await requestDrinks();
      setCurcategory(category);
      setApiResult(response);
    } else {
      const filteredCategory = await filterCategoryDrinks(category);
      setCurcategory(category);
      setApiResult(filteredCategory);
    }
  }

  async function handleClickAll() {
    const response = await requestDrinks();
    setApiResult(response);
    return null;
  }

  return (
    <div>
      <Header pageName="Bebidas" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          value="all"
          onClick={ () => handleClickAll() }
        >
          All
        </button>
        {drinkCategory.drinks && drinkCategory.drinks
          .slice(zero, cinco).map((element) => (
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
        { !hiddenInput ? apiResult.drinks && apiResult.drinks
          .slice(zero, doze).map((element, idx) => (
            <DrinkCard element={ element } idx={ idx } key={ element.idDrink } />
          )) : null }
      </div>

      <Footer />
    </div>
  );
}

export default DrinksRecipesPage;
