import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipesDrinksCards({ categories }) {
  const { data, setData } = useContext(RecipesContext);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const CINCO = 5;
  const DOZE = 12;

  const selectCategorie = async ({ innerText }) => {
    if (innerText === 'All' || innerText === selectedCategorie) {
      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const responseDrinksJson = await responseDrinks.json();
      return setData([data[0], responseDrinksJson]);
    }

    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`);
    const responseJson = await response.json();
    setSelectedCategorie(innerText);
    return setData([data[0], responseJson]);
  };

  if (!categories) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ ({ target }) => selectCategorie(target) }
      >
        All
      </button>
      {categories[1].drinks.filter((_, index) => index < CINCO)
        .map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            type="button"
            onClick={ ({ target }) => selectCategorie(target) }
          >
            { strCategory }
          </button>)) }
      {
        data[1].drinks.filter((_, index) => index < DOZE)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Link
              key={ idDrink }
              to={ `/bebidas/${idDrink}` }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-recipe"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
              </div>
            </Link>
          ))
      }
    </div>
  );
}

RecipesDrinksCards.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesDrinksCards;
