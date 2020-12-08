import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../Style/SearchBar.css';

function SearchBar({ verification, onClick }) {
  const { setSearchTerm } = useContext(RecipesAppContext);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        className="form-control"
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <div
        onChange={ (e) => verification(e) }
      >
        <label
          htmlFor="ingredient-search-radio"
        >
          <input
            type="radio"
            name="inputRadio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            className="label"
          />
          Ingredientes
        </label>
        <br />
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="inputRadio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            className="label"
          />
          Primeira letra
        </label>
        <br />
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="inputRadio"
            data-testid="name-search-radio"
            id="name-search-radio"
            className="label"
          />
          Nome
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        className="btn btn-secondary btn-lg btn-block"
        type="button"
        onClick={ onClick }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  verification: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
