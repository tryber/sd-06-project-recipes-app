import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ContextProvider({ children }) {
  const [foodAPI, setFoodAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [searchItens, setSearchItens] = useState();
  const [mealCategories, setMealCategories] = useState('');
  const [drinkCategories, setDrinkCategories] = useState('');
  const [currentMealsExplore, setCurrentMealsExplore] = useState(false);
  const [currentDrinkExplore, setCurrentDrinkExplore] = useState(false);

  const ContextValue = {
    foodAPI,
    setFoodAPI,
    drinkAPI,
    setDrinkAPI,
    searchItens,
    setSearchItens,
    mealCategories,
    setMealCategories,
    drinkCategories,
    setDrinkCategories,
    currentMealsExplore,
    setCurrentMealsExplore,
    currentDrinkExplore,
    setCurrentDrinkExplore,
  };

  return (
    <RecipeContext.Provider value={ ContextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
