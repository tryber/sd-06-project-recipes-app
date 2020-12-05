import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);
  const [mealsByIngredient, setMealsByIngredient] = useState([]);
  const [mealsByArea, setMealsByArea] = useState([]);
  const [drinksByIngredient, setDrinksByIngredient] = useState([]);
  const [showMealsByIngredient, setShowMealsByIngredient] = useState(false);
  const [showDrinksByIngredient, setShowDrinksByIngredient] = useState(false);
  const [search, setSearch] = useState(false);

  const contextValue = {
    email,
    setEmail,
    titulo,
    setTitulo,
    meals,
    setMeals,
    drinks,
    setDrinks,
    loading,
    setLoading,
    selectedMeal,
    setSelectedMeal,
    selectedDrink,
    setSelectedDrink,
    favoriteMeals,
    setFavoriteMeals,
    favoriteDrinks,
    setFavoriteDrinks,
    mealsByIngredient,
    setMealsByIngredient,
    mealsByArea,
    setMealsByArea,
    drinksByIngredient,
    setDrinksByIngredient,
    showMealsByIngredient,
    setShowMealsByIngredient,
    showDrinksByIngredient,
    setShowDrinksByIngredient,
    search,
    setSearch,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
