import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../../context/Context';
import { getMealsAPI, getDrinksApi } from '../../services/API';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [redirectTo, setRedirectTo] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState('');
  const { pageTitle, setSearch, setRecipes, setLoading } = useContext(Context);

  const handleSearchText = ({ target }) => {
    setSearchText(target.value);
  };

  const handleSearchType = (value) => {
    setSearchType(value);
  };

  const handleSearch = () => {
    if (searchType === 'firstletter' && searchText.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    setSearch({
      searchText,
      searchType,
    });
    setLoading(true);
    if (pageTitle === 'Comidas') {
      getMealsAPI(searchText, searchType).then((data) => {
        setRecipes(data);
        setLoading(false);
        if (!data) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          return;
        }
        if (data.length === 1) {
          setRedirectRoute(`/comidas/${data[0].idMeal}`);
          setRedirectTo(true);
        }
      });
    }
    if (pageTitle === 'Bebidas') {
      getDrinksApi(searchText, searchType).then((data) => {
        setRecipes(data);
        setLoading(false);
        if (!data) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          return;
        }
        if (data.length === 1) {
          setRedirectRoute(`/bebidas/${data[0].idDrink}`);
          setRedirectTo(true);
        }
      });
    }
  };

  return (
    <div>
      { redirectTo && <Redirect to={ redirectRoute } />}
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ searchText }
        onChange={ handleSearchText }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="search"
          data-testid="ingredient-search-radio"
          checked={ searchType === 'ingredient' }
          value="ingredient"
          onChange={ () => handleSearchType('ingredient') }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="search"
          checked={ searchType === 'name' }
          value="name"
          data-testid="name-search-radio"
          onChange={ () => handleSearchType('name') }
        />
        Nome
      </label>
      <label htmlFor="firstletter">
        <input
          type="radio"
          id="firstletter"
          name="search"
          checked={ searchType === 'firstletter' }
          value="firstletter"
          data-testid="first-letter-search-radio"
          onChange={ () => handleSearchType('firstletter') }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
