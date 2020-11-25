import React, { useState, useEffect } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Context
import RecipesContext from '../context/RecipesContext';

export default function RecipesProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isValid, setValid] = useState(true);
  const [fetchFood, setFetchFood] = useState([]);
  const [fetchDrink, setFetchDrink] = useState([]);
  const [DrinkBtn, setDrinkBtn] = useState([]);
  const [FoodBtn, setFoodBtn] = useState([]);
  const [filterFood, setFilterFood] = useState([]);
  const [filterDrink, setFilterDrink] = useState([]);
  const [radioValue, setRadioValue] = useState('');
  const [searchBar, setSearchBar] = useState('');
  // state para foodDetails
  const [foodDetail, setFoodDetail] = useState([]);

  // state para drinkDetails
  const [drinkDetail, setDrinkDetail] = useState([]);

  const [recomendedFood, setRecomendedFood] = useState([]);
  const [recomendedDrink, setRecomendedDrink] = useState([]);

  useEffect(() => {
    if (fetchFood && fetchFood.length === 1) {
      const { idMeal } = fetchFood[0];
      window.location.pathname = `/comidas/${idMeal}`;
    }
    if (!fetchFood) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [fetchFood]);

  useEffect(() => {
    if (fetchDrink && fetchDrink.length === 1) {
      const { idDrink } = fetchDrink[0];
      window.location.pathname = `/bebidas/${idDrink}`;
    }
    if (!fetchDrink) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [fetchDrink]);

  const context = {
    login,
    setLogin,
    isValid,
    setValid,
    fetchFood,
    setFetchFood,
    fetchDrink,
    DrinkBtn,
    setDrinkBtn,
    FoodBtn,
    setFoodBtn,
    filterFood,
    filterDrink,
    setFilterFood,
    setFilterDrink,
    radioValue,
    setRadioValue,
    searchBar,
    setSearchBar,
    setFetchDrink,
    foodDetail,
    setFoodDetail,
    drinkDetail,
    setDrinkDetail,
    recomendedFood,
    setRecomendedFood,
    recomendedDrink,
    setRecomendedDrink,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
