import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import fetchApiDrink from '../services/FetchApiDrink';

export default function SearchBar() {
  const { setselectEndpoint,
    setSearchBar,
    selectEndpoint,
    searchBar,
    setFetchDrink,
    setFetchFood,
  } = useContext(RecipesContext);

  const radioClick = ({ target }) => {
    setselectEndpoint(target.value);
  };

  const handleSearchBar = ({ target }) => {
    setSearchBar(target.value);
  };

  const handleSearchButton = async () => {
    if (selectEndpoint === '3' && searchBar.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const path = window.location.pathname;
    if (path.includes('comidas')) {
      await fetchApiFood(selectEndpoint, setFetchFood, searchBar);
    } else {
      await fetchApiDrink(selectEndpoint, setFetchDrink, searchBar);
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
            value="ingredients"
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
            value="name"
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
            value="firstLetter"
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
