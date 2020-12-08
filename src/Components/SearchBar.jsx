/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import recipeRequest from '../services/recipeRequest';
import RecipeContext from '../hooks/RecipeContext';
import '../Style/searchBar.css';

const SearchBar = ({ className }) => {
  const history = useHistory();
  const { pathname } = history.location;
  const [text, setText] = useState('');
  const [defaultUrl, setDefaultUrl] = useState('');
  const [API_URL, setApiUrl] = useState('');
  const [type, setType] = useState('');
  const {
    setDrinkRecipes,
    setFoodRecipes } = useContext(RecipeContext);

  const handleSearch = ({ target }) => {
    setText(target.value);
  };

  useEffect(() => {
    if (pathname === '/comidas') {
      setDefaultUrl('https://www.themealdb.com/api/json/v1/1/');
      setType('meals');
    } else {
      setDefaultUrl('https://www.thecocktaildb.com/api/json/v1/1/');
      setType('drinks');
    }
  }, []);

  const handleRadio = async ({ target }) => {
    switch (target.id) {
    case 'ingredients':
      setApiUrl(`${defaultUrl}filter.php?i=`);
      break;
    case 'name':
      setApiUrl(`${defaultUrl}search.php?s=`);
      break;
    case 'firstLetter':
      setApiUrl(`${defaultUrl}search.php?f=`);
      break;
    default:
      return false;
    }
    return true;
  };

  const redirectToIdProduct = (data, idType) => {
    history.push(`${pathname}/${data[type][0][idType]}`);
  };

  const handleButton = async () => {
    const firstLetter = `${defaultUrl}search.php?f=`;
    if (text.length > 1 && API_URL === firstLetter) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const url = `${API_URL}${text}`;
    const data = await recipeRequest(url);
    if (data[type] === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (type === 'meals' && data[type].length === 1) {
      redirectToIdProduct(data, 'idMeal');
    } else if (type === 'drinks' && data[type].length === 1) {
      redirectToIdProduct(data, 'idDrink');
    } else if (type === 'meals' && data[type].length > 1) {
      setFoodRecipes(data.meals);
    } else {
      setDrinkRecipes(data.drinks);
    }
  };

  return (
    <div className={ `search-bar ${className}` } id="searchBar">
      <input
        value={ text }
        onChange={ handleSearch }
        type="text"
        data-testid="search-input"
        className="text-input"
      />
      <div className="checkbox-inputs">
        <label htmlFor="ingredients">
          <input
            id="ingredients"
            onChange={ handleRadio }
            name="kind-of-search"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          <span>Ingredient</span>
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            id="name"
            onChange={ handleRadio }
            name="kind-of-search"
            type="radio"
          />
          <span>Name</span>
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            onChange={ handleRadio }
            name="kind-of-search"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          <span>First letter</span>
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ handleButton }
        type="button"
        className="button-search-bar"
      >
        Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  className: propTypes.string.isRequired,
};

export default SearchBar;
