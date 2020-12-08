import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getRecipesMealsApi, getRecipesMealsByCategoryApi } from '../services/mealsAPI';
import { getRecipeDrinksApi, getRecipeDrinksByCategoryApi } from '../services/drinksAPI';
import MealsContext from '../context/MealsContext';
import RecipeCard from './RecipeCard';
import '../Css/RecipeList.css';

function RecipeList() {
  const { drinkCategories,
    cardsRecipe,
    setCardsRecipe,
    categories } = useContext(MealsContext);
  const [cardCategories, setCardCategories] = useState([]);
  const [categorySelected, setcategorySelected] = useState([]);

  // Será usado para pegar o pathname ("comidas" ou "bebidas")
  const location = useLocation();

  // Atualizando estado da categoria local dependendo se for bebidas ou comidas
  if (location.pathname === '/comidas') {
    if (categories[0] !== undefined && cardCategories[0] === undefined) {
      setCardCategories(categories);
    }
  } else if (location.pathname === '/bebidas') {
    if (drinkCategories[0] !== undefined && cardCategories[0] === undefined) {
      setCardCategories(drinkCategories);
    }
  }

  async function getCards(category) {
    let myCards = [];
    let result = [];
    if (location.pathname === '/comidas') {
      if (category === 'All' || category === categorySelected) {
        result = await getRecipesMealsApi();
      } else {
        result = await getRecipesMealsByCategoryApi(category);
      }
      myCards = result.map((item) => {
        const myCategoriesMeal = {
          id: item.idMeal, strName: item.strMeal, strThumb: item.strMealThumb,
        };
        return myCategoriesMeal; // retorna o novo objeto criado no map do myCards
      });
    } else if (location.pathname === '/bebidas') {
      if (category === 'All' || category === categorySelected) {
        result = await getRecipeDrinksApi();
      } else {
        result = await getRecipeDrinksByCategoryApi(category);
      }
      myCards = result.map((item) => {
        const myCategoriesDrink = {
          id: item.idDrink, strName: item.strDrink, strThumb: item.strDrinkThumb,
        };
        return myCategoriesDrink; // retorna o novo objeto criado no map do myCards
      });
    }
    setCardsRecipe(myCards);
    setcategorySelected(category);
  }

  useEffect(() => {
    if (cardsRecipe[0] === undefined) {
      getCards('All');
    }
  }, []);

  const numberZero = 0;
  const numberTwo = 2;
  const numberFive = 5;
  return (
    <div className="recipe-list-container">
      <div>
        <div className="container-button">
          <button
            type="button"
            data-testid="All-category-filter"
            className="button-recipe"
            onClick={ () => getCards('All') }
          >
            All
          </button>
          {cardCategories.slice(numberZero, numberTwo).map((item) => (
            <button
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              key={ item.strCategory }
              className="button-recipe"
              onClick={ () => getCards(item.strCategory) }
            >
              {item.strCategory}
            </button>
          ))}
        </div>
        <div className="container-button">
          {cardCategories.slice(numberTwo, numberFive).map((item) => (
            <button
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              key={ item.strCategory }
              className="button-recipe"
              onClick={ () => getCards(item.strCategory) }
            >
              {item.strCategory}
            </button>
          ))}
        </div>
      </div>
      <div className="cards-container">
        <RecipeCard cards={ cardsRecipe } />
      </div>
    </div>
  );
}

export default RecipeList;
