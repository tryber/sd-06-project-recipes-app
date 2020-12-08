import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import BtnSearchBar from '../../components/MainHeader/BtnSearchBar';

import * as cocktailAPI from '../../services/cocktailAPI';
import * as mealAPI from '../../services/mealAPI';
import recipesAppContext from '../../context/recipesAppContext';
import './style.css';

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
    <div>
      <div className="recipes-page-container">
        <Header
          pageTitle="Bebidas"
          BtnSearchBar={ BtnSearchBar }
        />
        <div className="categories">
          <input
            className="category-button"
            type="button"
            data-testid="All-category-filter"
            value="All"
            onClick={ changeFilter }
          />
          {categories.map((category, index) => {
            const dataTestID = `${category.strCategory}-category-filter`;
            if (index < five) {
              if (type === 'cocktails') {
                return (
                  <input
                    key={ index }
                    className="category-button"
                    type="button"
                    data-testid={ dataTestID }
                    value={ category.strCategory }
                    onClick={ changeFilter }
                  />
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
            }
            return (null);
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DrinksPage;
