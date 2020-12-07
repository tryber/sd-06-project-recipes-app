import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import fetchApiDrink from '../services/FetchApiDrink';

// Styled components
import {
  SearchBarContainer,
  CustomRadioContainer,
  CustomSearchInput,
  CheckMarkRadio,
  ButtonSearch } from '../styles/searchBarStyle';

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
    <SearchBarContainer>
      <form>
        <div>
          <CustomSearchInput
            onChange={ handleSearchBar }
            id="Busca"
            type="text"
            data-testid="search-input"
            placeholder="Busque aqui"
          />
        </div>

        <CustomRadioContainer>
          Ingrediente
          <input
            onClick={ radioClick }
            name="select"
            type="radio"
            value="1"
            id="ingrediente"
            data-testid="ingredient-search-radio"
          />
          <CheckMarkRadio />
        </CustomRadioContainer>

        <CustomRadioContainer>
          Nome
          <input
            onClick={ radioClick }
            id="nome"
            type="radio"
            value="2"
            data-testid="name-search-radio"
            name="select"
          />
          <CheckMarkRadio />
        </CustomRadioContainer>

        <CustomRadioContainer>
          Primeira letra
          <input
            onClick={ radioClick }
            id="primeira-letra"
            type="radio"
            value="3"
            data-testid="first-letter-search-radio"
            name="select"
          />
          <CheckMarkRadio />
        </CustomRadioContainer>

      </form>
      <ButtonSearch
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchButton }
      >
        Buscar
      </ButtonSearch>
    </SearchBarContainer>
  );
}
