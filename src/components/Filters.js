import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Cards from './Cards';
import {
  requestIngredients,
  requestName,
  requestFirstLetter,
  requestDrinksIngredients,
  requestDrinksName,
  requestDrinksFirstLetter,
} from '../services/requestsAPI';

function Filters() {
  const history = useHistory();
  const [radioValue, setRadioValue] = useState('');
  const { resultsFoodsAndDrinks, setResultsFoodsAndDrinks } = useContext(RecipesContext);

  const { valueInput } = useContext(RecipesContext);

  function handleRadio({ target }) {
    const targetValue = target.value;
    if (targetValue === 'ingredients') {
      return setRadioValue(targetValue);
    }
    if (targetValue === 'name') {
      return setRadioValue(targetValue);
    }
    if (targetValue === 'firstLetter') {
      return setRadioValue(targetValue);
    }
    return null;
  }

  async function handleClick() {
    const url = document.URL;
    const splitedURL = url.split('/');
    if (splitedURL[3] === 'comidas') {
      if (radioValue === 'ingredients') {
        const resultIngredients = await requestIngredients(valueInput);
        console.log(resultIngredients);
        if (resultIngredients.meals !== null) {
          return setResultsFoodsAndDrinks(resultIngredients);
        }
        return (alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        ));
      }
      if (radioValue === 'name') {
        const resultName = await requestName(valueInput);
        console.log(resultName);
        if (resultName.meals !== null) {
          return setResultsFoodsAndDrinks(resultName);
        }
        return (alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        ));
      }
      if (radioValue === 'firstLetter' && valueInput.length === 1) {
        const resultFirstLetter = await requestFirstLetter(valueInput);
        console.log(resultFirstLetter);
        return setResultsFoodsAndDrinks(resultFirstLetter);
      }
      if (radioValue === 'firstLetter' && valueInput.length > 1) {
        alert(
          'Sua busca deve conter somente 1 (um) caracter',
        );
      }
    }

    if (splitedURL[3] === 'bebidas') {
      if (radioValue === 'ingredients') {
        const resultDrinksIngredients = await requestDrinksIngredients(valueInput);
        console.log(resultDrinksIngredients);
        if (resultDrinksIngredients !== null) {
          return setResultsFoodsAndDrinks(resultDrinksIngredients);
        }
      }
      if (radioValue === 'name') {
        const resultDrinksName = await requestDrinksName(valueInput);
        console.log(resultDrinksName);
        if (resultDrinksName.drinks !== null) {
          console.log('entrou no if do null');
          return setResultsFoodsAndDrinks(resultDrinksName);
        }
        return (alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        ));
      }
      if (radioValue === 'firstLetter' && valueInput.length === 1) {
        const resultDrinksFirstLetter = await requestDrinksFirstLetter(valueInput);
        console.log(resultDrinksFirstLetter);
        return setResultsFoodsAndDrinks(resultDrinksFirstLetter);
      }
      if (radioValue === 'firstLetter' && valueInput.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }
    return null;
  }

  function handleResults() {
    const url = document.URL;
    const splitedURL = url.split('/');
    const one = 1;

    // if (resultsFoodsAndDrinks.drinks.length === 0 || resultsFoodsAndDrinks.meals.length === 0) {
    //   alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    // } else {
    if (splitedURL[3] === 'comidas') {
      const idFood = resultsFoodsAndDrinks.meals[0].idMeal;
      if (resultsFoodsAndDrinks.meals.length === one) {
        history.push(`/comidas/${idFood}`);
      }
    }

    if (splitedURL[3] === 'bebidas') {
      const idDrinks = resultsFoodsAndDrinks.drinks[0].idDrink;
      if (resultsFoodsAndDrinks.drinks.length === one) {
        history.push(`/bebidas/${idDrinks}`);
      }
    }
    // }
    return null;
  }

  useEffect(() => {
    if (resultsFoodsAndDrinks.drinks || resultsFoodsAndDrinks.meals) {
      console.log('entrou no iif');
      handleResults();
    }
  }, [resultsFoodsAndDrinks]);

  return (
    <div>

      <label htmlFor="ingredients">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radios"
          id="ingredients"
          value="ingredients"
          onClick={ (e) => handleRadio(e) }
        />
        Ingredientes
      </label>

      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radios"
          id="name"
          value="name"
          onClick={ (e) => handleRadio(e) }
        />
        Nome
      </label>

      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="radios"
          id="firstLetter"
          value="firstLetter"
          onClick={ (e) => handleRadio(e) }
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Buscar
      </button>
      <div>
        { resultsFoodsAndDrinks.meals ? <Cards /> : null }
        { resultsFoodsAndDrinks.drinks ? <Cards /> : null }
      </div>
    </div>
  );
}

export default Filters;
