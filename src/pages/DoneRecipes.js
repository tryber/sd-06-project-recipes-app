import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';

export default function DoneRecipes() {
  const [recipesArray, setRecipesArray] = useState([]);
  const [filter, setFilter] = useState('All');
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filter === 'Food') {
      setRecipesArray(recipes.filter((recipe) => recipe.type === 'comida'));
    }
    if (filter === 'Drinks') {
      setRecipesArray(recipes.filter((recipe) => recipe.type === 'bebida'));
    }
    if (filter === 'All') setRecipesArray(recipes);
  }, [filter]);

  function handleFilterClick({ target }) {
    setFilter(target.innerHTML);
  }

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        onClick={ handleFilterClick }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleFilterClick }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ handleFilterClick }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <div className="cards-container">
        {recipesArray.map((recipe, index) => (
          <div key={ index } className="recipe-card">
            <DoneCard recipe={ recipe } index={ index } />
          </div>
        ))}
      </div>
    </div>
  );
}
