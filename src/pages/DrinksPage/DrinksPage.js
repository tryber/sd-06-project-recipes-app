import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';

import * as cocktailAPI from '../../services/cocktailAPI';
import * as mealAPI from '../../services/mealAPI';
import recipesAppContext from '../../context/recipesAppContext';

function DrinksPage() {
  const [state, changeState] = useState({
    type: '',
    recipes: [],
    categories: [],
    filter: '',
    newFilter: '',
  });
  const [wLocation] = useState(window.location.href);
  const { control, setControl, data } = useContext(recipesAppContext);
  let localState = state;
  const zero = 0;
  const five = 5;
  const twelve = 12;

  async function setState(newState) {
    changeState({ ...localState, ...newState });
    localState = { ...localState, ...newState };
  }

  async function loadRecipes() {
    const { newFilter, type } = localState;
    if (newFilter !== zero) {
      let temp = {};
      if (type === 'cocktails') {
        if (control) {
          temp = data;
          setControl(false);
        } else if (newFilter !== (zero || '')) {
          temp = await cocktailAPI.filterByCategory(newFilter);
        } else {
          temp = await cocktailAPI.fetchDrink('name', '');
        }
        setState({
          filter: newFilter,
          recipes: temp.drinks,
          newFilter: zero,
        });
      } else if (type === 'meals') {
        if (control) {
          temp = data;
          setControl(false);
        } else if (newFilter !== (zero || '')) {
          temp = await mealAPI.filterByCategory(newFilter);
        } else {
          temp = await mealAPI.fetchMeal('name', '');
        }
        setState({
          filter: newFilter,
          recipes: temp.meals,
          newFilter: zero,
        });
      }
    }
  }

  async function loadCategories(arg) {
    if (arg === 'cocktails') {
      const temp = await cocktailAPI.listCategories();
      setState({ categories: temp.drinks });
    }
    if (arg === 'meals') {
      const temp = await mealAPI.listCategories();
      setState({ categories: temp.meals });
    }

    loadRecipes();
  }

  async function changeFilter({ target }) {
    const { filter } = localState;
    if (target.value === 'All') {
      setState({
        newFilter: '',
        recipes: [],
      });

      loadRecipes();

      return;
    }
    if (filter !== target.value) {
      setState({
        newFilter: target.value,
        recipes: [],
      });
    } else {
      setState({
        newFilter: '',
        recipes: [],
      });
    }

    loadRecipes();
  }

  function loadSearchResults() {
    setState({
      newFilter: '',
      recipes: [],
    });

    loadRecipes();
  }

  if (localState.type === '') {
    if (wLocation === 'http://localhost:3000/comidas') {
      setState({ type: 'meals' });
      loadCategories('meals');
    } else if (wLocation === 'http://localhost:3000/bebidas') {
      setState({ type: 'cocktails' });
      loadCategories('cocktails');
    }
  }

  useEffect(() => {
    if (control) {
      loadSearchResults();
    }
  }, [control]);

  const { recipes, categories, type } = localState;

  if (recipes.length === zero || categories.length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <Header
        className="header"
        pageTitle="Bebidas"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="categories">
        <div className="category-button">
          <input
            type="button"
            data-testid="All-category-filter"
            value="All"
            onClick={ changeFilter }
          />
        </div>
        {categories.map((category, index) => {
          const dataTestID = `${category.strCategory}-category-filter`;
          if (index < five) {
            if (type === 'cocktails') {
              return (
                <div className="category-button" key={ index }>
                  <input
                    type="button"
                    data-testid={ dataTestID }
                    value={ category.strCategory }
                    onClick={ changeFilter }
                  />
                </div>
              );
            }
            if (type === 'meals') {
              return (
                <div className="category-button" key={ index }>
                  <input
                    type="button"
                    data-testid={ dataTestID }
                    value={ category.strCategory }
                    onClick={ changeFilter }
                  />
                </div>
              );
            }
          }
          return (null);
        })}
      </div>
      <div className="recipes-section">
        {recipes.map((recipe, index) => {
          if (index < twelve) {
            const dataTestID = `${index}-recipe-card`;
            const dataTestIDImg = `${index}-card-img`;
            const dataTestIDCard = `${index}-card-name`;
            if (type === 'cocktails') {
              return (
                <Link key={ index } to={ `/bebidas/${recipe.idDrink}` }>
                  <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                    <img
                      alt="Drink Thumb"
                      data-testid={ dataTestIDImg }
                      src={ recipe.strDrinkThumb }
                      className="recipe-thumb"
                      height="250"
                    />
                    <h2
                      className="recipe-name"
                      data-testid={ dataTestIDCard }
                    >
                      {recipe.strDrink}
                    </h2>
                  </div>
                </Link>
              );
            }
            if (type === 'meals') {
              return (
                <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                  <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                    <img
                      alt="Meal Thumb"
                      data-testid={ dataTestIDImg }
                      src={ recipe.strMealThumb }
                      className="recipe-thumb"
                      height="250"
                    />
                    <h2
                      className="recipe-name"
                      data-testid={ dataTestIDCard }
                    >
                      {recipe.strMeal}
                    </h2>
                  </div>
                </Link>
              );
            }
          }
          return (null);
        })}
      </div>
      <div>
        <Footer className="footer-container" />
      </div>
    </div>
  );
}

export default DrinksPage;
