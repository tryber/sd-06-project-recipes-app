import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';
import Header from '../components/header';
import '../Style/Feitas.css';

function RecipesMade() {
  const recipesFinalized = JSON.parse(localStorage.getItem('doneRecipes'));
  const [clipBoardCopy, setClipBoardCopy] = useState(false);
  const [updateRecipes, setUpdateRecipes] = useState(recipesFinalized);
  console.log('o que é recipesFinalized:', recipesFinalized);
  console.log('o que updateRecipe:', updateRecipes);

  const renderTags = (recipeTag) => {
    console.log('tag receita finalizada:', recipeTag);
    return recipeTag.map((tag) => (
      <p
        key={ tag }
        data-testid={ `0-${tag}-horizontal-tag` }
      >
        { tag }
      </p>
    ));
  };

  const copiedClipBoard = async (id, type) => {
    setClipBoardCopy(true);
    const urlRecipe = `http://localhost:3000/${type}s/${id}`;
    await copy(urlRecipe);
    // window.navigator.clipboard.writeText(urlRecipe);
  };

  const filterRecipeDone = (selectedFilter) => {
    console.log('filtro selecionado:', selectedFilter);
    if (selectedFilter === 'food') {
      const filterFood = updateRecipes.filter((filter) => filter.type === 'comida');
      setUpdateRecipes(filterFood);
    }
    if (selectedFilter === 'drinks') {
      const filterDrink = updateRecipes.filter((filter) => filter.type === 'bebida');
      setUpdateRecipes(filterDrink);
    }
    if (selectedFilter === 'all') {
      setUpdateRecipes(recipesFinalized);
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="container-feitas">
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ ({ target }) => filterRecipeDone(target.value) }
          className="btn btn-feitas"
        >
          All
        </button>
        <button
          type="button"
          value="food"
          data-testid="filter-by-food-btn"
          onClick={ ({ target }) => filterRecipeDone(target.value) }
          className="btn btn-feitas"
        >
          Food
        </button>
        <button
          type="button"
          value="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ ({ target }) => filterRecipeDone(target.value) }
          className="btn btn-feitas"
        >
          Drinks
        </button>
      </div>
      { updateRecipes.map((recipe, index) => (
        <div
          key={ recipe.id }
          className="card-feitas"
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              width="300px"
              height="300px"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="recipe alredy finalized"
              className="image-feitas"
            />
            <h1
              data-testid={ `${index}-horizontal-name` }
              className="title-feitas"
            >
              { recipe.name }
            </h1>
          </Link>
          {recipe.type === 'comida' && (
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.area} - ${recipe.category}`}
            </span>
          )}
          <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
          {recipe.type === 'bebida' && (
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`Tipo: ${recipe.alcoholicOrNot}`}
            </span>
          )}
          {recipe.type === 'comida' && (
            <div>
              { !recipe.tags ? '' : renderTags(recipe.tags) }
            </div>
          )}
          <button
            type="button"
            onClick={ () => copiedClipBoard(recipe.id, recipe.type) }
            className="btn "
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
              alt="icon share"
            />
          </button>
          { clipBoardCopy && <p>Link copiado!</p> }
        </div>
      ))}
    </div>
  );
}

export default RecipesMade;
