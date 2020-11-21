import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import recipeRequest from '../services/recipeRequest';

const SearchBar = ({ history }) => {
  const { pathname } = history.location;
  const [text, setText] = useState('');
  const [defaultUrl, setDefaultUrl] = useState('');
  const [API_URL, setApiUrl] = useState('');
  const [type, setType] = useState('');

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
    }
    return data;
  };

  return (
    <div>
      <button type="button" data-testid="search-top-btn">
        Lupa
      </button>
      <input
        value={ text }
        onChange={ handleSearch }
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredients">
        <input
          id="ingredients"
          onChange={ handleRadio }
          name="kind-of-search"
          type="radio"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          id="name"
          onChange={ handleRadio }
          name="kind-of-search"
          type="radio"
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          id="firstLetter"
          onChange={ handleRadio }
          name="kind-of-search"
          type="radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleButton }
        type="button"
      >
        Buscar
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  history: propTypes.arrayOf(propTypes.object).isRequired,
};

export default SearchBar;
