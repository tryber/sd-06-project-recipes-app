import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { loading } from '../images';
import '../style/CategoriesButtons.css';

function CategoriesButtonsDrinks({ categories }) {
  const { data, setData } = useContext(RecipesContext);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const h1 = document.querySelector('h1').innerText;
  const CINCO = 5;
  const ZER0 = 0;

  const selectCategorie = async ({ innerText }) => {
    let URL;
    if (innerText === 'All' || innerText === selectedCategorie) {
      URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const URL2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const responseMeals = await fetch(URL);
      const responseDrinks = await fetch(URL2);
      const responseMealsJson = await responseMeals.json();
      const responseDrinksJson = await responseDrinks.json();
      setSelectedCategorie('');
      return setData([responseMealsJson, responseDrinksJson]);
    }
    if (h1 === 'Bebidas') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`;
      const response = await fetch(URL);
      const responseJson = await response.json();
      setSelectedCategorie(innerText);
      return setData([data[0], responseJson]);
    }
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`;
    const response = await fetch(URL);
    const responseJson = await response.json();
    setSelectedCategorie(innerText);
    return setData([responseJson, data[1]]);
  };

  if (!categories) {
    return <img className="loading" src={ loading } alt="loading" />;
  }

  return (
    <div className="div-bttn-category">
      <button
        className="bttn-category-drink"
        data-testid="All-category-filter"
        type="button"
        onClick={ ({ target }) => selectCategorie(target) }
      >
        All
      </button>
      {categories[h1 === 'Comidas' ? ZER0 : 1][h1 === 'Comidas' ? 'meals' : 'drinks']
        .filter((_, index) => index < CINCO)
        .map(({ strCategory }) => (
          <button
            className="bttn-category-drink"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ ({ target }) => selectCategorie(target) }
          >
            { strCategory }
          </button>)) }
    </div>
  );
}

CategoriesButtonsDrinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesButtonsDrinks;
