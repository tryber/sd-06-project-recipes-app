import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from './RevenueContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState(false);
  const [searchButton, setSearchButton] = useState(true);
  const [foods, setFoods] = useState([]);
  const [recommendations, setRecommendations] = useState();
  const [categories, setCategories] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [searchParam, setSearchParam] = useState();
  const [externFetchLink, setexternFetchLink] = useState();
  const [inProgress, setInProgress] = useState(false);

  const [localStorageFavorites, setLocalStorageFavorites] = useState(
    JSON
      .parse(localStorage
        .getItem('favoriteRecipes')),
  );

  const [localStorageDoneRecipes, setLocalStorageDoneRecipes] = useState(
    JSON
      .parse(localStorage
        .getItem('doneRecipes')),
  );

  const [localStorageInProgress, setLocalStorageInProgress] = useState(
    JSON
      .parse(localStorage
        .getItem('inProgressRecipes')),
  );

  if (!localStorageInProgress) {
    setLocalStorageInProgress({ cocktails: {}, meals: {} });
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {}, meals: {} }));
  }

  if (!localStorageFavorites) {
    setLocalStorageFavorites([]);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify([]));
  }

  if (!localStorageDoneRecipes) {
    setLocalStorageDoneRecipes([]);
    localStorage
      .setItem('doneRecipes', JSON
        .stringify([]));
  }

  const fetchApi = async (URL) => {
    setisLoading(true);
    const response = await fetch(URL);
    const json = await response.json();
    setisLoading(false);
    if (searchParam === 'Drink') {
      if (json.drinks) {
        setFoods(json.drinks);
      } else if (json.ingredients) {
        setSearchParam('Ingredients');
        setFoods(json.ingredients);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    console.log(searchParam);
    if (searchParam === 'Meal') {
      if (json.meals) {
        setFoods(json.meals);
      } else if (json.ingredients) {
        setSearchParam('Ingredients');
        setFoods(json.ingredients);
      } else {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  };

  const fetchRecommendations = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    if (searchParam === 'Meal') setRecommendations(json.drinks);
    if (searchParam === 'Drink') setRecommendations(json.meals);
  };

  const fetchByCategory = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    if (searchParam === 'Drink') setFoods(json.drinks);
    if (searchParam === 'Meal') setFoods(json.meals);
  };

  const fetchCategories = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    setCategories(json);
  };

  const context = {
    email,
    password,
    setEmail,
    setPassword,
    search,
    setSearch,
    searchButton,
    setSearchButton,
    searchParam,
    setSearchParam,
    foods,
    setFoods,
    fetchApi,
    isLoading,
    setisLoading,
    recommendations,
    fetchRecommendations,
    categories,
    fetchCategories,
    fetchByCategory,
    externFetchLink,
    setexternFetchLink,
    inProgress,
    setInProgress,
    localStorageFavorites,
    setLocalStorageFavorites,
    localStorageDoneRecipes,
    setLocalStorageDoneRecipes,
    localStorageInProgress,
    setLocalStorageInProgress,
  };

  return (
    <RevenueContext.Provider value={ context }>
      {children}
    </RevenueContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
