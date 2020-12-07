import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';

function Provider({ children }) {
  const [btnDisable, setBtnDisable] = useState(true);
  const [showSearchBar, setSearchBar] = useState(false);
  const [user, setUser] = useState({ email: '' });
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [drinks, setDrinks] = useState('');
  const [idRecipe, setIdRecipe] = useState('');
  const [typeRecipe, setTypeRecipe] = useState('');
  const [recipeStarted, setRecipeStart] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const contextValue = {
    btnDisable,
    setBtnDisable,
    user,
    setUser,
    showSearchBar,
    setSearchBar,
    searchText,
    setSearchText,
    selectedRadio,
    setSelectedRadio,
    recipes,
    setRecipes,
    drinks,
    setDrinks,
    idRecipe,
    setIdRecipe,
    typeRecipe,
    setTypeRecipe,
    recipeStarted,
    setRecipeStart,
    showCard,
    setShowCard,
  };

  return (
    <ContextRecipes.Provider value={ contextValue }>
      {children}
    </ContextRecipes.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
