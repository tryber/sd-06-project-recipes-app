import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareBtn';
import './ReceitasFeitas.css';

// import shareIcon from '../images/shareIcon.svg';

const ReceitasFeitas = () => {
  const [recipesComplete, setRecipesComplete] = useState();

  const handleRecipeLocalStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    } else {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecipesComplete(doneRecipes);
    }
  };

  const filterRecipes = (value) => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (value === 'food') {
      const comidaFilter = (recipes.filter((res) => res.type === 'comida'));
      setRecipesComplete(comidaFilter);
    } else if (value === 'drinks') {
      const bebidaFilter = (recipes.filter((res) => res.type === 'bebida'));
      setRecipesComplete(bebidaFilter);
    } else {
      setRecipesComplete(recipes);
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
          { recipesComplete && (
            recipesComplete.map((infoFoof, i) => (
              <div
                key={ i }
                className="main-card"
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ infoFoof.photoFood }
                  alt={ infoFoof.name }
                />
                <div className="container-informations">
                  <div className="top-informations">
                    <span
                      data-testid={ `${i}-horizontal-top-text` }
                    >
                      { infoFoof.category }
                    </span>
                    <ShareButton />
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

export default ReceitasFeitas;
