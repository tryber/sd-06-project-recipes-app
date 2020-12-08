import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ApiExploreByPlaceOfOrigin,
  showSugestedFoods,
  searchByOrigin,
} from '../services/aPI';

import Header from '../components/Header';
import Footer from '../components/Footer';

import './ComidasLocalOrigem.css';

const ComidasLocalOrigem = () => {
  const [stateNamesOrigins, setNamesOrigins] = useState();
  const [stateSugestionsFoods, setSugestionsFoods] = useState();
  // const [stateAllFoods, setAllFoods] = useState();

  const handleSearchExploreOrigin = async () => {
    const originsLocal = await ApiExploreByPlaceOfOrigin();

    setNamesOrigins(originsLocal);
  };

  const handleSugestedFoods = async () => {
    const number = 12;

    const foods = await showSugestedFoods();

    foods.meals.splice(number);

    // console.log(foods);

    setSugestionsFoods({
      foods,
    });
  };

  useEffect(() => {
    handleSearchExploreOrigin();
    handleSugestedFoods();
  }, []);

  const searchAll = async ({ value }) => {
    if (value === 'All') {
      const allFoods = await showSugestedFoods();

      setSugestionsFoods({
        foods: allFoods,
      });
    } else {
      const number = 12;

      const originFoods = await searchByOrigin(value);

      originFoods.meals.splice(number);

      console.log(originFoods);

      setSugestionsFoods({
        foods: originFoods,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container-select">
        <select
          name="select"
          className="select"
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => searchAll(target) }
        >
          <option>Escolha um local de origem</option>
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {stateNamesOrigins
          && stateNamesOrigins.meals.map((origin, i) => (
            <option
              key={ i }
              value={ origin.strArea }
              data-testid={ `${origin.strArea}-option` }
            >
              {origin.strArea}
            </option>
          ))}
        </select>
      </div>

      <div className="main-cards">
        {!stateSugestionsFoods ? <div>Loading...</div> : (
          stateSugestionsFoods.foods.meals.map((meal, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ meal.strMeal }
            >
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <button
                type="button"
              >
                <Link to={ `/comidas/${meal.idMeal}` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                </Link>
              </button>
            </div>
          ))) }
      </div>
      <Footer />
    </div>
  );
};

export default ComidasLocalOrigem;
