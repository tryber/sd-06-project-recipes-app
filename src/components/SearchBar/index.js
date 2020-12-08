import React, { useContext, useState } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { searchFood, searchDrink } from '../../services/aPI';
import './styles.css';

const SearchBar = () => {
  const { searchComponent, setApiValueSearch, apiValueSearch } = useContext(ContextAPI);
  const [nome, setNome] = useState('');
  const [radioButton, setRadioButton] = useState('');

  const handleChange = (target) => {
    if (target.name === 'radio-button') setRadioButton(target.value);

    if (target.name === 'text') setNome(target.value);
  };

  const handleChangeButton = async () => {
    if (radioButton === 'primeira-letra' && nome.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (window.location.pathname === '/bebidas') {
      const drinks = await searchDrink(nome, radioButton);
      if (drinks === undefined || drinks.drinks === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        return setApiValueSearch({
          ...apiValueSearch,
          drinks,
        });
      }
    }
    const foods = await searchFood(nome, radioButton);
    if (foods.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      return setApiValueSearch({
        ...apiValueSearch,
        foods,
      });
    }
  };

  return searchComponent && (
    <div className="main-search-bar">
      <div id="search-bar">
        <input
          data-testid="search-input"
          placeholder="Search recipe:"
          name="text"
          type="text"
          onChange={
            (e) => handleChange(e.target)
          }
        />
        <div className="input-radio">
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
        </div>
        <button
          id="primeira-letra"
          type="button"
          onClick={ handleChangeButton }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
