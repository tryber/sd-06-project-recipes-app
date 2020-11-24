import React, { useContext, useState } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { searchFoodIngredients,
  searchFoodName,
  searchFoodFirstLetter,
  searchDrinkIngredients,
  searchDrinkName,
  searchDrinkFirstLetter,
} from '../../services/aPI';

const SearchBar = () => {
  const { searchComponent, setApiValueSearch, apiValueSearch } = useContext(ContextAPI);
  const [nome, setNome] = useState('');
  const [radioButton, setRadioButton] = useState('');

  const handleChange = (target) => {
    if (target.name === 'radio-button') setRadioButton(target.value);

    if (target.name === 'text') setNome(target.value);
  };

  const apiOfIngredients = async () => {
    if (window.location.pathname === '/bebidas') {
      const drinks = await searchDrinkIngredients(nome);
      return setApiValueSearch({
        ...apiValueSearch,
        drinks,
      });
    }
    const foods = await searchFoodIngredients(nome);
    return setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };

  const apiOfName = async () => {
    if (window.location.pathname === '/bebidas') {
      const drinks = await searchDrinkName(nome);
      return setApiValueSearch({
        ...apiValueSearch,
        drinks,
      });
    }
    const foods = await searchFoodName(nome);
    return setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };

  const apiOfFirstLetter = async () => {
    if (nome.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (window.location.pathname === '/bebidas') {
      const drinks = await searchDrinkFirstLetter(nome);
      return setApiValueSearch({
        ...apiValueSearch,
        drinks,
      });
    }
    const foods = await searchFoodFirstLetter(nome);
    return setApiValueSearch({
      ...apiValueSearch,
      foods,
    });
  };

  const handleChangeButton = () => {
    switch (radioButton) {
    case 'ingrediente':
      return apiOfIngredients();
    case 'nome':
      return apiOfName();
    case 'primeira-letra':
      return apiOfFirstLetter();
    default:
      return '';
    }
  };

  return searchComponent && (
    <div id="search-bar">
      <input
        data-testid="search-input"
        name="text"
        type="text"
        onChange={
          (e) => handleChange(e.target)
        }
      />
      <br />
      <label htmlFor="ingrediente-button">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingrediente-button"
          name="radio-button"
          value="ingrediente"
          onChange={ (e) => handleChange(e.target) }
        />
        Ingrediente
      </label>
      <label htmlFor="nome-button">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="nome-button"
          name="radio-button"
          value="nome"
          onChange={ (e) => handleChange(e.target) }
        />
        Nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="primeira-letra"
          name="radio-button"
          value="primeira-letra"
          onChange={ (e) => handleChange(e.target) }
        />
        Primeira Letra
      </label>
      <br />
      <button
        id="primeira-letra"
        type="button"
        onClick={ handleChangeButton }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
