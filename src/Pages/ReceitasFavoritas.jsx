import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './ReceitasFeitas.css';
import './ReceitasFavoritas.css';

import shareIcon from '../images/shareIcon.svg';

const ReceitasFavoritas = () => {
  const [recipesFavorites, setRecipesFavorites] = useState();

  const handleRecipeLocalStorage = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setRecipesFavorites(favoriteRecipes);
    }
  };

  const filterRecipes = (value) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (value === 'food') {
      const comidaFilter = (recipes.filter((res) => res.type === 'comida'));
      setRecipesFavorites(comidaFilter);
    } else if (value === 'drinks') {
      const bebidaFilter = (recipes.filter((res) => res.type === 'bebida'));
      setRecipesFavorites(bebidaFilter);
    } else {
      setRecipesFavorites(recipes);
    }
  };

  useEffect(() => {
    handleRecipeLocalStorage();
  }, []);

  return (
    <div>
      <Header />
      <div className="main-recaipe-made">
        <div className="container-button-recipe-made">
          <button
            type="button"
            name="All"
            data-testid="filter-by-all-btn"
            onClick={ (e) => filterRecipes(e.target.name) }
          >
            All
          </button>
          <button
            type="button"
            name="food"
            data-testid="filter-by-food-btn"
            onClick={ (e) => filterRecipes(e.target.name) }
          >
            Food
          </button>
          <button
            type="button"
            name="drinks"
            data-testid="filter-by-drink-btn"
            onClick={ (e) => filterRecipes(e.target.name) }
          >

            Drinks
          </button>
        </div>
        <div className="container-cards">
          { recipesFavorites && (
            recipesFavorites.map((infoFoof, i) => (
              <div
                key={ i }
                className="main-card"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ infoFoof.image }
                  alt={ infoFoof.name }
                />
                <div className="container-informations">
                  <div className="top-informations">
                    <span
                      data-testid={ `${i}-horizontal-top-text` }
                    >
                      { infoFoof.category }
                    </span>
                    <button type="button">
                      <img
                        data-testid={ `${i}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="shareIcon"
                      />
                    </button>
                  </div>
                  <div className="middle-informations">
                    <span
                      data-testid={ `${i}-horizontal-name` }
                    >
                      { infoFoof.name }
                    </span>
                    <p
                      data-testid={ `${i}-horizontal-done-date` }
                    >
                      Feita em: 29/10/2020
                    </p>
                  </div>
                  <div className="container-tags">
                    <span
                      data-testid={ `${i}-${infoFoof[0]}-horizontal-tag` }
                    >
                      tag
                    </span>
                    <span>tag</span>
                  </div>
                </div>
              </div>
            ))
          ) }
        </div>
      </div>
    </div>
  );
};

export default ReceitasFavoritas;
