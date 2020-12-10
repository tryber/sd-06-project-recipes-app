import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import FoodCard from './FoodCard';
import DrinkCard from './DrinkCard';

function FoodCards() {
  const { resultsFoodsAndDrinks } = useContext(RecipesContext);
  console.log(resultsFoodsAndDrinks);
  const url = document.URL;
  const splitedURL = url.split('/');
  const zero = 0;
  const doze = 12;
  return (
    <div>
      { splitedURL[3] === 'bebidas'
        ? (
          resultsFoodsAndDrinks
          && resultsFoodsAndDrinks.drinks.slice(zero, doze).map((element, idx) => (
            <DrinkCard element={ element } idx={ idx } key={ element.idDrink } />))
        )
        : (
          resultsFoodsAndDrinks
          && resultsFoodsAndDrinks.meals.slice(zero, doze).map((element, idx) => (
            <FoodCard element={ element } idx={ idx } key={ element.idMeal } />)))}
    </div>
  );
}

export default FoodCards;
