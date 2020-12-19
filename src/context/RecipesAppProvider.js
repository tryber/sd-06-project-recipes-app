import React, { useState } from 'react';
import propTypes from 'prop-types';
import recipesAppContext from './recipesAppContext';
import { fetchMeal } from '../services/mealAPI';
import { fetchDrink } from '../services/cocktailAPI';

function RecipesAppProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [data, setData] = useState({});
  const [control, setControl] = useState(false);
  const [recipesMeals, setRecipesMeals] = useState({});
  const [recipesDrinks, setRecipesDrinks] = useState({});

  const setFetchMeal = async (type, key) => {
    const result = await fetchMeal(type, key);
    setData(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.meals === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.meals.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const setFetchDrink = async (type, key) => {
    const result = await fetchDrink(type, key);
    setData(result);
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.drinks === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const fetchMealIngredients = async (id) => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    setRecipesMeals(recipesByIdApi.meals[0]);
  };

  const fetchDrinkIngredients = async (id) => {
    const recipesByIdApi = await fetchDrink('lookupIngredient', id);
    setRecipesDrinks(recipesByIdApi.drinks[0]);
  };

  const contextValue = {
    searchBar,
    setSearchBar,
    data,
    setFetchMeal,
    setFetchDrink,
    control,
    setControl,
    recipesMeals,
    recipesDrinks,
    fetchMealIngredients,
    fetchDrinkIngredients,
  };
  return (
    <recipesAppContext.Provider value={ contextValue }>
      {children}
    </recipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: propTypes.func.isRequired,
};

export default RecipesAppProvider;
