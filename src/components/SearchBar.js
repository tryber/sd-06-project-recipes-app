import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/SearchBar.css';

function SearchBar({ title, searchBar, setSearchBar }) {
  const { data, setData } = useContext(RecipesContext);
  const [inputRecipe, setInputRecipe] = useState('');
  const [radioValue, setRadioValue] = useState('i');
  const history = useHistory();

  const onlyOne = (recipe) => {
    if (title === 'Comidas') {
      if (recipe.meals.length === 1) {
        setData([recipe, data[1]]);
        return history.push(
          {
            pathname: `/comidas/${recipe.meals[0].idMeal}`,
          },
        );
      }
      return;
    }
    if (recipe.drinks.length === 1) {
      return history.push(
        {
          pathname: `/bebidas/${recipe.drinks[0].idDrink}`,
          state: { recipe: recipe.drinks[0] },
        },
      );
    }
  };

  const searchFood = async () => {
    setSearchBar(false);
    if (title === 'Comidas') {
      if (radioValue === 'i') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
        const responseJson = await response.json();
        if (responseJson.meals === null) {
          return alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
        onlyOne(responseJson);
        return setData([responseJson, data[1]]);
      }
      if (radioValue === 'f' && inputRecipe.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.meals === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData([responseJson, data[1]]);
    }

    if (radioValue === 'i') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.drinks === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData([data[0], responseJson]);
    }
    if (radioValue === 'f' && inputRecipe.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
    const responseJson = await response.json();
    if (responseJson.drinks === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    onlyOne(responseJson);
    return setData([data[0], responseJson]);
  };

  return (
    searchBar
    && (
      <div className="searchBar">
        <input
          value={ inputRecipe }
          onChange={ ({ target: { value } }) => { setInputRecipe(value); } }
          data-testid="search-input"
          type="text"
          placeholder="Buscar Receita"
        />
        <div>
          <label htmlFor="radioIngrediente">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              id="radioIngrediente"
              name="search"
              onClick={ () => { setRadioValue('i'); } }
            />
            Ingrediente
          </label>
          <label htmlFor="radioNome">
            <input
              type="radio"
              id="radioNome"
              name="search"
              onClick={ () => { setRadioValue('s'); } }
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="radioLetra">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              id="radioLetra"
              name="search"
              onClick={ () => { setRadioValue('f'); } }
            />
            Primeira Letra
          </label>
        </div>
        <button
          data-testid="exec-search-btn"
          onClick={ searchFood }
          type="button"
        >
          Buscar
        </button>
      </div>)
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
  setSearchBar: PropTypes.func.isRequired,
};

export default SearchBar;
