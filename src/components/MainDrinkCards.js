import React, { useContext, useEffect, useState } from 'react';

import RecipesContext from '../context/RecipesContext';

function MainDrinkCard() {
  const {
    DrinkApi,
    fetchDrink,
    DrinkButton,
    DrinkBtn,
    filterDrink,
    DrinkCategory,
    setFilterDrink } = useContext(RecipesContext);

  useEffect(() => {
    DrinkApi();
    DrinkButton();
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
      DrinkCategory(filter);
      setTargetName(filter);
    }
  };
  const filterAll = () => {
    setFilterDrink([]);
  };

  if (filterDrink.length > inicio) {
    return (
      <main>
        <section>
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
              {`${el.strCategory}${idx}`}
            </button>)).slice(inicio, btn) }
        </section>
        <section>
          {filterDrink.map((el, idx) => (
            <div
              key={ idx }
              data-testid={ `${idx}-recipe-card` }
            >
              <p data-testid={ `${idx}-card-name` }>{`${el.strDrink}${idx}`}</p>
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
        </section>
      </main>
    );
  }
  return (
    <main>
      <section>
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
          </button>)).slice(inicio, btn) }
      </section>
      <section>
        {fetchDrink.map((el, idx) => (
          <div
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
          >
            <p data-testid={ `${idx}-card-name` }>{el.strDrink}</p>
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
        )).splice(inicio, fim)}
      </section>
    </main>
  );
}

export default MainDrinkCard;
