import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodFilterName,
  requestApiFoodFilterFirstLetter,
} from '../services/requestFood';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkFilterName,
  requestApiDrinkFilterFirstLetter,
} from '../services/requestDrink';
import '../styles/HeaderSearch.css';

function HeaderSearch({ name }) {
  const {
    cards: {
      setCardFood,
      setCardDrink,
      cardFood,
      cardDrink,
    },
  } = useContext(RecipesAppContext);
  const [radioValue, setRadioValue] = useState('');
  const [textSearch, setTextSearch] = useState('');

  const [redirectFood, setRedirectFood] = useState(false);
  const [redirectDrink, setRedirectDrink] = useState(false);

  const searchFood = () => {
    if (radioValue === 'ingredientes' && textSearch !== '') {
      return requestApiFoodFilterIngredient(textSearch);
    }
    if (radioValue === 'nome' && textSearch !== '') {
      return requestApiFoodFilterName(textSearch);
    }
    if (radioValue === 'primeira-letra' && textSearch.length === 1) {
      return requestApiFoodFilterFirstLetter(textSearch);
    }
    if (radioValue === 'primeira-letra') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const searchDrink = () => {
    if (radioValue === 'ingredientes' && textSearch !== '') {
      return requestApiDrinkFilterIngredient(textSearch);
    }
    if (radioValue === 'nome' && textSearch !== '') {
      return requestApiDrinkFilterName(textSearch);
    }
    if (radioValue === 'primeira-letra' && textSearch.length === 1) {
      return requestApiDrinkFilterFirstLetter(textSearch);
    }
    if (radioValue === 'primeira-letra') {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const [searchButtonClick, setSearchButtonClick] = useState(false);

  const alertFilterNotExist = (answerApi) => {
    if (answerApi === null) {
      setSearchButtonClick(false);
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos '
      + 'nenhuma receita para esses filtros.');
    }
  };

  const searchOnClick = async () => {
    if (name === 'Comidas') {
      setSearchButtonClick(true);
      const answerApi = await searchFood();
      alertFilterNotExist(answerApi);
      if (answerApi) setCardFood(answerApi);
    } else if (name === 'Bebidas') {
      setSearchButtonClick(true);
      const answerApi = await searchDrink();
      alertFilterNotExist(answerApi);
      if (answerApi) setCardDrink(answerApi);
    }
  };

  useEffect(() => {
    if (searchButtonClick) {
      setSearchButtonClick(false);
      if (cardDrink.length === 1) {
        setRedirectDrink(true);
      }
    }
  }, [cardDrink]);

  useEffect(() => {
    if (searchButtonClick) {
      setSearchButtonClick(false);
      if (cardFood.length === 1) {
        setRedirectFood(true);
      }
    }
  }, [cardFood]);

  const captureValue = (e) => {
    setRadioValue(e.target.value);
  };

  const captureTextInput = (e) => {
    setTextSearch(e.target.value);
  };

  if (redirectFood) {
    const { idMeal } = cardFood[0];
    return (<Redirect to={ `/comidas/${idMeal}` } />);
  }

  if (redirectDrink) {
    const { idDrink } = cardDrink[0];
    return (<Redirect to={ `/bebidas/${idDrink}` } />);
  }

  return (
    <div className="search-div">
      <input
        type="text"
        data-testid="search-input"
        onChange={ captureTextInput }
        placeholder="Buscar Receita"
        className="input-buscar-receita"
      />
      <div className="radio-div">
        <label htmlFor="ingredientes">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredientes"
            name="busca"
            value="ingredientes"
            onChange={ captureValue }
          />
          Ingredientes
        </label>
        <label htmlFor="nome">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="nome"
            name="busca"
            value="nome"
            onChange={ captureValue }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="primeira-letra"
            name="busca"
            value="primeira-letra"
            onChange={ captureValue }
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchOnClick }
      >
        Buscar
      </button>
    </div>
  );
}

HeaderSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderSearch;
