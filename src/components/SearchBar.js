import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [showIcon, setShowIcon] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    showSearchBar,
    setSearchBar,
    getFilteredRecipesApi,
    getFilteredDrinksApi,
    setCardsRecipe,
  } = useContext(MealsContext);

  useEffect(() => {
    switch (pathname) {
    case '/explorar':
      return setShowIcon(false);
    case '/explorar/comidas':
      return setShowIcon(false);
    case '/explorar/comidas/ingredientes':
      return setShowIcon(false);
    case '/explorar/bebidas':
      return setShowIcon(false);
    case '/explorar/bebidas/ingredientes':
      return setShowIcon(false);
    case '/receitas-feitas':
      return setShowIcon(false);
    case '/receitas-favoritas':
      return setShowIcon(false);
    case '/perfil':
      return setShowIcon(false);
    default:
      return setShowIcon(true);
    }
  }, []);

  const showOrHideSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const handleRadio = ({ target }) => {
    const { value } = target;
    switch (value) {
    case 'ingredients':
      return setRadioValue(value);
    case 'name':
      return setRadioValue(value);
    case 'first':
      return setRadioValue(value);
    default:
      return '';
    }
  };
  const handleButton = async () => {
    if (inputValue.length !== 1 && radioValue === 'first') {
      console.log('first');
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas') {
      const recipes = await getFilteredRecipesApi(radioValue, inputValue);
      console.log('comidas', recipes);
      if (recipes === null || recipes === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (recipes.length === 1) {
        return history.push(`/comidas/${recipes[0].idMeal}`);
      } else {
        const myCards = recipes.map((item) => {
          const cardsMeal = {
            id: item.idMeal, strName: item.strMeal, strThumb: item.strMealThumb,
          };
          return cardsMeal; // retorna o novo objeto criado no map do myCards
        });
        setCardsRecipe(myCards);
      }
    } else if (pathname === '/bebidas') {
      const drinks = await getFilteredDrinksApi(radioValue, inputValue);
      console.log(drinks);
      if (drinks === null || drinks === undefined) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (drinks.length === 1) {
        return history.push(`/bebidas/${drinks[0].idDrink}`);
      } else {
        const myCards = drinks.map((item) => {
          const cardsDrinks = {
            id: item.idDrink, strName: item.strDrink, strThumb: item.strDrinkThumb,
          };
          return cardsDrinks; // retorna o novo objeto criado no map do myCards
        });
        setCardsRecipe(myCards);
      }
    }
  };
  return (
    <div>
      {showIcon ? <img
        src={ searchIcon }
        alt="Search"
        data-testid="search-top-btn"
        onClick={ showOrHideSearchBar }
        aria-hidden="true"
      /> : null}
      {showSearchBar
        ? (
          <div>
            <input
              type="text"
              data-testid="search-input"
              id="search-input"
              name="search"
              onChange={ handleChange }
            />
            <div>
              <label htmlFor="filter">
                <input
                  type="radio"
                  value="ingredients"
                  name="filter"
                  data-testid="ingredient-search-radio"
                  onChange={ handleRadio }
                />
                Ingredients
              </label>
              <label htmlFor="filter">
                <input
                  type="radio"
                  value="name"
                  name="filter"
                  data-testid="name-search-radio"
                  onChange={ handleRadio }
                />
                Nome
              </label>
              <label htmlFor="filter">
                <input
                  type="radio"
                  value="first"
                  name="filter"
                  data-testid="first-letter-search-radio"
                  onChange={ handleRadio }
                />
                Primeira letra
              </label>
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ handleButton }
              >
                Buscar
              </button>
            </div>
          </div>)
        : null}
    </div>
  );
}
export default SearchBar;
