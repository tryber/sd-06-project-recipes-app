import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      setIsLoading(true);
      const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseMealJson = await responseMeal.json();

      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const responseDrinksJson = await responseDrinks.json();
      setData([responseMealJson, responseDrinksJson]);
      setIsLoading(false);
    }
    fetchAPI();
  }, []);

  const contextState = {
    loading: false,
    foodIngredients: ['1', '2', '3', '4', '5', '6', '7', '8'],
    drinkIngredients: ['1', '2', '3'],
    isLoading,
    data,
    setData,
  };

  return (
    <RecipesContext.Provider value={ contextState }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
