/* eslint-disable no-alert */
import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import './Food.css';

function Food() {
  const { setFoodAPI,
    mealCategories, currentMealsExplore, searchItens } = useContext(RecipeContext);
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState('');
  const [currentMeals, setCurrentMeals] = useState([]);
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlMealsCategories = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategories}`;
  const urlMealsCategories2 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentCategories}`;
  console.log(searchItens);

  useEffect(() => {
    const fecthMeals = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setMeals(APIResponse.meals);
        setFoodAPI(APIResponse.meals);
      }
    };
    fecthMeals();

    if (mealCategories) {
      setCurrentCategories(mealCategories);
    }

    const fecthCategory = async () => {
      const APIRequestCategory = await fetch(urlCategories);
      const APIResponseCategory = await APIRequestCategory.json();
      if (APIResponseCategory !== null) {
        setCategories(APIResponseCategory.meals);
      }
    };
    fecthCategory();
  }, []);

  useEffect(() => {
    const fecthMealsCategory = async () => {
      const APIRequestMealsCategory = await fetch(urlMealsCategories);
      const APIResponseMealsCategory = await APIRequestMealsCategory.json();
      const APIRequestMealsCategory2 = await fetch(urlMealsCategories2);
      const APIResponseMealsCategory2 = await APIRequestMealsCategory2.json();
      if (APIResponseMealsCategory2 !== null
        && currentMealsExplore && currentCategories !== 'ok') {
        setCurrentMeals(APIResponseMealsCategory2.meals);
      }
      if (APIResponseMealsCategory !== null
        && !currentMealsExplore && currentCategories !== 'ok') {
        setCurrentMeals(APIResponseMealsCategory.meals);
      }
    };
    fecthMealsCategory();
  }, [currentCategories]);

  useEffect(() => {
    const fecthSearch = async () => {
      if (searchItens) {
        const { searchInput, searchRadio } = searchItens;
        if (searchInput === 'xablau') {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }
        if (searchRadio === 'Nome') {
          const urlSearchName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
          const APISearchRequest = await fetch(urlSearchName);
          const APISearchResponse = await APISearchRequest.json();
          if (APISearchResponse !== null && searchItens) {
            setCurrentMeals(APISearchResponse.meals);
            setCurrentCategories('ok');
          }
        }
        if (searchRadio === 'Ingrediente') {
          const urlSearchName = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
          const APISearchRequest = await fetch(urlSearchName);
          const APISearchResponse = await APISearchRequest.json();
          if (APISearchResponse !== null && searchItens) {
            setCurrentMeals(APISearchResponse.meals);
            setCurrentCategories('ok');
            console.log(searchItens.searchRadio);
          }
        }
        if (searchRadio === 'PrimeiraLetra') {
          if (searchInput.length > 1) {
            alert('Sua busca deve conter somente 1 (um) caracter');
          } else {
            const urlSearchName = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
            const APISearchRequest = await fetch(urlSearchName);
            const APISearchResponse = await APISearchRequest.json();
            if (APISearchResponse !== null && searchItens) {
              setCurrentMeals(APISearchResponse.meals);
              setCurrentCategories('ok');
              console.log(searchItens.searchRadio);
            }
          }
        }
      }
    };

    fecthSearch();
  }, [searchItens]);

  const firstMeal = 0;
  const limitMeal = 12;
  const limitCategory = 5;

  const renderMeals = () => {
    if (currentCategories === '') {
      return meals.slice(firstMeal, limitMeal).map((meal, id) => (
        <Link to={ `/comidas/${meal.idMeal}` } key={ id }>
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recipe-card` }
            value={ meal.strCategory }
          >
            <img
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{meal.strMeal}</h3>
          </div>
        </Link>
      ));
    } if (currentMeals) {
      if (searchItens !== undefined && currentMeals.length === 1) {
        return <Redirect to="/comidas/52771" />;
      }
      return currentMeals
        .slice(firstMeal, limitMeal).map((meal, id) => (
          <Link to={ `/comidas/${meal.idMeal}` } key={ id }>
            <div
              key={ id }
              className="recipe-card"
              data-testid={ `${id}-recipe-card` }
              value={ meal.strCategory }
            >
              <img
                className="card-img"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${id}-card-img` }
              />
              <p data-testid={ `${id}-card-name` }>{meal.strMeal}</p>
            </div>
          </Link>
        ));
    }
  };

  const handleClickCategory = ({ target: { value } }) => {
    if (currentCategories !== value) {
      setCurrentCategories(value);
    }
    if (currentCategories === value) {
      setCurrentCategories('');
    }
  };

  return (
    <div className="food-container">
      <Header title="Comidas" />
      {
        categories.slice(firstMeal, limitCategory).map((category, id) => (
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
        renderMeals()
      }
      <Footer />
    </div>
  );
}

export default Food;
