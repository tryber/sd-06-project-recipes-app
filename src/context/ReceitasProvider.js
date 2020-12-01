import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [stopApi, setStopApi] = useState([]);
  const [drinksIngredientList, setDrinksIngredientList] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [filtersData, setFiltersData] = useState(['All']);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [randomDrinkID, setRandomDrink] = useState();
  const [randomMealID, setRandomMeal] = useState();
  const [fetchById, setFetchById] = useState();
  const [beganRecipes, setBeganRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const state = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    searchBox,
    setSearchBox,
    fetching,
    setFetching,
    filtersData,
    setFiltersData,
    selectedFilter,
    setSelectedFilter,
    randomDrinkID,
    setRandomDrink,
    randomMealID,
    setRandomMeal,
    stopApi,
    setStopApi,
    ingredientList,
    setIngredientList,
    drinksIngredientList,
    setDrinksIngredientList,
    fetchById,
    setFetchById,
    beganRecipes,
    setBeganRecipes,
    doneRecipes,
    setDoneRecipes,
  };

  return (
    <ReceitasContext.Provider value={ state }>
      {children}
    </ReceitasContext.Provider>
  );
};

ReceitasProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default ReceitasProvider;
