import React, { useContext, useEffect, useState } from 'react';
import FetchApiFood from '../services/FetchApiFood';

import RecipesContext from '../context/RecipesContext';

import SearchBar from './SearchBar';

import { FilterButtonsContainer, Cards } from '../styles/mainFoodDrink';

function MainFoodCard() {
  const {
    fetchFood,
    setFetchFood,
    FoodBtn,
    setFoodBtn,
    filterFood,
    effectOnLoad,
    setFilterFood,
    searchBar } = useContext(RecipesContext);

  useEffect(() => {
    if (effectOnLoad) {
      FetchApiFood('2', setFetchFood);
      FetchApiFood('4', setFoodBtn);
    }
  }, []);

  const [targetName, setTargetName] = useState('');
  const inicio = 0;
  const fim = 12;
  const btn = 5;

  const handleClick = ({ target }) => {
    const filter = target.name;
    if (targetName === filter) {
      setFilterFood([]);
    }
    if (targetName !== filter) {
      FetchApiFood('5', setFilterFood, filter);
      setTargetName(filter);
    }
  };

  const filterAll = () => {
    setFilterFood([]);
  };

  if (filterFood.length > inicio) {
    return (
      <main>
        <FilterButtonsContainer className="filter-buttons">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => filterAll() }
          >
            All
          </button>
          {FoodBtn.map((el, idx) => (
            <button
              type="button"
              key={ idx }
              data-testid={ `${el.strCategory}-category-filter` }
              name={ el.strCategory }
              onClick={ (e) => handleClick(e) }
            >
              {el.strCategory}
            </button>)).splice(inicio, btn) }
        </FilterButtonsContainer>
        <Cards>
          {filterFood.map((el, idx) => (
            <div
              key={ idx }
              data-testid={ `${idx}-recipe-card` }
            >
              <p data-testid={ `${idx}-card-name` }>{`[  ${el.strMeal}  ]`}</p>
              <a
                href={ `/comidas/${el.idMeal}` }
              >
                <img
                  data-testid={ `${idx}-card-img` }
                  src={ el.strMealThumb }
                  alt="food-pic"
                />
              </a>
            </div>
          )).splice(inicio, fim)}
        </Cards>
      </main>
    );
  }
  return (
    <main>
      {searchBar ? <SearchBar /> : null}
      <FilterButtonsContainer>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterAll() }
        >
          All
        </button>
        {FoodBtn.map((el, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${el.strCategory}-category-filter` }
            name={ el.strCategory }
            onClick={ (e) => handleClick(e) }
          >
            {el.strCategory}
          </button>)).splice(inicio, btn) }
      </FilterButtonsContainer>
      <Cards>
        {fetchFood ? fetchFood.map((el, idx) => (
          <div
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
          >
            <p data-testid={ `${idx}-card-name` }>{`[  ${el.strMeal}  ]`}</p>
            <a
              href={ `/comidas/${el.idMeal}` }
            >
              <img
                data-testid={ `${idx}-card-img` }
                src={ el.strMealThumb }
                alt="food-pic"
              />
            </a>
          </div>
        )).splice(inicio, fim) : null}
      </Cards>
    </main>
  );
}

export default MainFoodCard;
