import React from 'react';
import './Components.css';

function SearchBar() {
  return (
    <div>
      <div className="search">
        <input
          data-testid="search-input"
          placeholder="Buscar Receita"
          className="searchInput"
        />
      </div>
      <form className="searchForm">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search"
            id="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name="search"
            id="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
