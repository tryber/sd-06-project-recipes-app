import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function MadeRecipes() {
  const { state } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <p>{ state.idMeal }</p>
    </div>
  );
}

export default MadeRecipes;
