import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import fetchApiDrink from '../services/FetchApiDrink';

export default function SearchBar() {
  const { setRadioValue,
    setSearchBar,
    radioValue,
    searchBar,
    setFetchDrink,
    setFetchFood,
  } = useContext(RecipesContext);

  const radioClick = ({ target }) => {
    setRadioValue(target.value);
  };

  const handleSearchBar = ({ target }) => {
    setSearchBar(target.value);
  };

  const handleSearchButton = async () => {
    if (radioValue === '3' && searchBar.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const path = window.location.pathname;
    if (path.includes('comidas')) {
      await fetchApiFood(radioValue, setFetchFood, searchBar);
    } else {
      await fetchApiDrink(radioValue, setFetchDrink, searchBar);
    }
  };

  return (
    <div className="SearchBar">
      <form>
        <label htmlFor="Busca">
          Barra de Busca:
          <input
            onChange={ handleSearchBar }
            id="Busca"
            type="text"
            data-testid="search-input"
          />
        </label>
        <br />
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            onClick={ radioClick }
            name="select"
            type="radio"
            value="1"
            id="ingrediente"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="nome">
          Nome
          <input
            onClick={ radioClick }
            id="nome"
            type="radio"
            value="2"
            data-testid="name-search-radio"
            name="select"
          />
        </label>
        <label htmlFor="primeira-letra">
          Primeira Letra
          <input
            onClick={ radioClick }
            id="primeira-letra"
            type="radio"
            value="3"
            data-testid="first-letter-search-radio"
            name="select"
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchButton }
      >
        Buscar
      </button>
    </div>
  );
}
