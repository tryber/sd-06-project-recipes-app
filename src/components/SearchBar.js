import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../css/SearchBar.css';

function SearchBar() {
  const {
    setSearchInput,
  } = useContext(RecipesContext);

  const [inputText, setTextValue] = useState('');
  const [inputRadio, setRadioValue] = useState('');

  const onChange = (value) => {
    setTextValue(value);
  };

  const onClick = (value) => {
    setRadioValue(value);
  };

  const onSubmit = (textInput, radioInput) => {
    setSearchInput({
      filterType: radioInput,
      query: textInput,
      readyToSearch: true,
    });
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <label htmlFor="search-input">
          <input
            data-testid="search-input"
            id="search-input"
            placeholder="Buscar Receita"
            type="text"
            onChange={ ({ target }) => onChange(target.value) }
            value={ inputText }
          />
        </label>
      </div>
      <div className="filter-selector-container">
        <label
          htmlFor="ingredient-search-radio"
        >
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="filter-selector"
            type="radio"
            onClick={ ({ target }) => onClick(target.value) }
            value="ingredient-filter"
          />
        </label>

        <label
          htmlFor="name-search-radio"
        >
          Nome
          <input
            data-testid="name-search-radio"
            id="name-search-radio"
            name="filter-selector"
            type="radio"
            onClick={ ({ target }) => onClick(target.value) }
            value="name-filter"
          />
        </label>

        <label
          htmlFor="first-letter-search-radio"
        >
          Primeira Letra
          <input
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="filter-selector"
            type="radio"
            onClick={ ({ target }) => onClick(target.value) }
            value="first-letter-filter"
          />
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => onSubmit(inputText, inputRadio) }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
