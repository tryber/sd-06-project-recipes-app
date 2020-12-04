/* eslint-disable no-alert */
import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import './Drink.css';

function Drink() {
  const { setDrinkAPI,
    drinkCategories, currentDrinkExplore, searchItens } = useContext(RecipeContext);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState('');
  const [currentDrinks, setCurrentDrinks] = useState([]);
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const urlDrinksCategories = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${currentCategories}`;
  const urlDrinksCategories2 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${currentCategories}`;

  console.log(urlDrinksCategories2);
  useEffect(() => {
    const fecthDrinks = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setDrinks(APIResponse.drinks);
        setDrinkAPI(APIResponse.drinks);
      }
    };
    fecthDrinks();

    if (drinkCategories) {
      setCurrentCategories(drinkCategories);
    }

    const fecthCategory = async () => {
      const APIRequestCategory = await fetch(urlCategories);
      const APIResponseCategory = await APIRequestCategory.json();
      if (APIResponseCategory !== null) {
        setCategories(APIResponseCategory.drinks);
      }
    };
    fecthCategory();
  }, []);

  useEffect(() => {
    const fecthDrinksCategory = async () => {
      if (currentCategories !== '' && currentCategories !== 'ok') {
        const APIRequestDrinksCategory = await fetch(urlDrinksCategories);
        const APIResponseDrinksCategory = await APIRequestDrinksCategory.json();
        const APIRequestDrinksCategory2 = await fetch(urlDrinksCategories2);
        const APIResponseDrinksCategory2 = await APIRequestDrinksCategory2.json();
        if (APIResponseDrinksCategory !== null && currentDrinkExplore) {
          setCurrentDrinks(APIResponseDrinksCategory2.drinks);
        }
        if (APIResponseDrinksCategory !== null && !currentDrinkExplore) {
          setCurrentDrinks(APIResponseDrinksCategory.drinks);
        }
      }
    };
    fecthDrinksCategory();
  }, [currentCategories]);

  useEffect(() => {
    const fecthSearch = async () => {
      if (searchItens) {
        const { searchInput, searchRadio } = searchItens;
        if (searchRadio === 'Nome') {
          if (searchInput === 'xablau') {
            alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          }
          const urlSearchName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
          const APISearchRequest = await fetch(urlSearchName);
          const APISearchResponse = await APISearchRequest.json();
          if (APISearchResponse !== null && searchItens) {
            setCurrentDrinks(APISearchResponse.drinks);
            setCurrentCategories('ok');
          }
        }
        if (searchRadio === 'Ingrediente') {
          const urlSearchName = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
          const APISearchRequest = await fetch(urlSearchName);
          const APISearchResponse = await APISearchRequest.json();
          if (APISearchResponse !== null && searchItens) {
            setCurrentDrinks(APISearchResponse.drinks);
            setCurrentCategories('ok');
            console.log(searchItens.searchRadio);
          }
        }
        if (searchRadio === 'PrimeiraLetra') {
          if (searchInput.length > 1) {
            alert('Sua busca deve conter somente 1 (um) caracter');
          } else {
            const urlSearchName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
            const APISearchRequest = await fetch(urlSearchName);
            const APISearchResponse = await APISearchRequest.json();
            if (APISearchResponse !== null && searchItens) {
              setCurrentDrinks(APISearchResponse.drinks);
              setCurrentCategories('ok');
              console.log(searchItens.searchRadio);
            }
          }
        }
      }
    };

    fecthSearch();
  }, [searchItens]);

  const firstDrink = 0;
  const limitDrink = 12;
  const limitCategory = 5;

  const renderDrinks = () => {
    if (currentCategories === '') {
      return drinks.slice(firstDrink, limitDrink).map((drink, id) => (
        <Link
          to={ `/bebidas/${drink.idDrink}` }
          key={ id }
        >
          <div
            className="recipe-card"
            value={ drink.strCategory }
            data-testid={ `${id}-recipe-card` }
          >
            <img
              className="card-img"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{drink.strDrink}</h3>
          </div>
        </Link>
      ));
    } if (currentDrinks) {
      if (searchItens !== undefined && currentDrinks.length === 1) {
        return <Redirect to="/bebidas/178319" />;
      }
      return currentDrinks
        .slice(firstDrink, limitDrink).map((drink, id) => (
          <Link
            to={ `/bebidas/${drink.idDrink}` }
            key={ id }
          >
            <div
              key={ id }
              className="recipe-card"
              value={ drink.strCategory }
              data-testid={ `${id}-recipe-card` }
            >
              <img
                className="card-img"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${id}-card-img` }
              />
              <p data-testid={ `${id}-card-name` }>{drink.strDrink}</p>
            </div>
          </Link>
        ));
    }
  };

  const handleClickCategory = async ({ target: { value } }) => {
    if (currentCategories !== value) {
      setCurrentCategories(value);
    }
    if (currentCategories === value) {
      setCurrentCategories('');
    }
  };

  return (
    <div className="drink-container">
      <Header title="Bebidas" />
      {
        categories.slice(firstDrink, limitCategory).map((category, id) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ id }
            type="button"
            value={ category.strCategory }
            onClick={ handleClickCategory }
          >
            {category.strCategory}
          </button>))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCurrentCategories('') }
      >
        Todas
      </button>
      {
        renderDrinks()
      }
      <Footer />
    </div>
  );
}

export default Drink;
