import React, { useContext, useEffect, useState } from 'react';
import FetchApiDrink from '../services/FetchApiDrink';

import SearchBar from './SearchBar';

import RecipesContext from '../context/RecipesContext';

import { FilterButtonsContainer, Cards } from '../styles/mainFoodDrink';

function MainDrinkCard() {
  const {
    fetchDrink,
    DrinkBtn,
    setDrinkBtn,
    filterDrink,
    setFetchDrink,
    effectOnLoad,
    setFilterDrink,
    searchBar } = useContext(RecipesContext);

  useEffect(() => {
    if (effectOnLoad) {
      FetchApiDrink('2', setFetchDrink);
      FetchApiDrink('4', setDrinkBtn);
    }
  }, []);

  const [targetName, setTargetName] = useState('');
  const inicio = 0;
  const fim = 12;
  const btn = 5;

  const handleClick = ({ target }) => {
    const filter = target.name;
    if (targetName === filter) {
      setFilterDrink([]);
    }
    if (targetName !== filter) {
      FetchApiDrink('5', setFilterDrink, filter);
      setTargetName(filter);
    }
  };
  const filterAll = () => {
    setFilterDrink([]);
  };

  if (filterDrink.length > inicio) {
    return (
      <main>
        <FilterButtonsContainer>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => filterAll() }
          >
            All
          </button>
          {DrinkBtn.map((el, idx) => (
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
          {filterDrink.map((el, idx) => (
            <div
              key={ idx }
              data-testid={ `${idx}-recipe-card` }
            >
              <p data-testid={ `${idx}-card-name` }>{`[  ${el.strDrink}  ]`}</p>
              <a
                href={ `/bebidas/${el.idDrink}` }
              >
                <img
                  data-testid={ `${idx}-card-img` }
                  src={ el.strDrinkThumb }
                  alt="Drink-pic"
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
        {DrinkBtn.map((el, idx) => (
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
        {fetchDrink ? fetchDrink.map((el, idx) => (
          <div
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
          >
            <p data-testid={ `${idx}-card-name` }>{`[  ${el.strDrink}  ]`}</p>
            <a
              href={ `/bebidas/${el.idDrink}` }
            >
              <img
                data-testid={ `${idx}-card-img` }
                src={ el.strDrinkThumb }
                alt="drink-pic"
              />
            </a>
          </div>
        )).splice(inicio, fim) : null}
      </Cards>
    </main>
  );
}

export default MainDrinkCard;
