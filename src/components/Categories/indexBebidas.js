import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import './styles.css';

const CategoriesBebidas = () => {
  const { apiValueSearch,
    setApiValueSearch,
    categories } = useContext(ContextAPI);

  const getSugestedDrinks = async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((drinks) => drinks.json())
      .then((drinks) => setApiValueSearch({ ...apiValueSearch, drinks }));
  };

  const filterApiValueSearch = async (value) => {
    if (apiValueSearch.value === value) {
      getSugestedDrinks();
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((drinks) => drinks.json())
        .then((drinks) => setApiValueSearch({ ...apiValueSearch, drinks, value }));
    }
  };

  const showAllFoods = async () => {
    getSugestedDrinks();
  };

  return !categories.drinks ? (
    <p>loading</p>
  ) : (
    <div className="main-categories">
      {categories.drinks && categories.drinks.map((element, index) => {
        const number = 4;
        if (index <= number) {
          return (
            <button
              data-testid={ `${element.strCategory}-category-filter` }
              onClick={ (e) => filterApiValueSearch(e.target.name) }
              name={ element.strCategory }
              type="button"
            >
              { element.strCategory }
            </button>
          );
        }
        return '';
      })}
      <button
        data-testid="All-category-filter"
        type="button"
        id="All"
        onClick={ (e) => showAllFoods(e.target.id) }
      >
        All
      </button>
    </div>
  );
};

export default CategoriesBebidas;
