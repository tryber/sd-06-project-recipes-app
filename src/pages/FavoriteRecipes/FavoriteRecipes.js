import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/MainHeader/Header';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../../images';
import {
  getFavoriteRecipes,
  favoriteRecipe,
  recipeIsFavorite,
} from '../../services/localStorage';

function FavoritesRecipes() {
  const [type, setType] = useState('');
  const pixels = 200;
  const [favoriteRecipes, setFavoriteRecipes] = useState(getFavoriteRecipes());
  console.log('sort', favoriteRecipes.sort());

  const onlyDrinks = favoriteRecipes.filter((element) => element.type === 'bebida');
  const onlyFoods = favoriteRecipes.filter((element) => element.type === 'comida');
  const foods = onlyFoods.length;
  const favorites = onlyFoods.concat(onlyDrinks);

  const saveToLocalStorage = async ({ target }) => {
    const recipeID = target.id;
    const recipe = favoriteRecipes.find((item) => item.id === recipeID);
    favoriteRecipe(recipe);
    setFavoriteRecipes(getFavoriteRecipes());
  };

  const handleShareIcon = (target) => {
    const keys = target.id.split(',');
    let urlLinkDetail = '';
    if (keys[1] === 'comida') {
      urlLinkDetail = `http://localhost:3000/comidas/${keys[0]}`;
    } else if (keys[1] === 'bebida') {
      urlLinkDetail = `http://localhost:3000/bebidas/${keys[0]}`;
    }
    copy(urlLinkDetail);
    console.log(urlLinkDetail);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector(`.copied-link-${keys[0]}`);
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };
  const zero = 0;
  return (
    <div className="recipes-page-container">
      <Header
        className="header"
        pageTitle="Receitas Favoritas"
      />
      <div className="categories">
        <input
          data-testid="filter-by-all-btn"
          className="category-button"
          onClick={ () => setType('') }
          type="button"
          value="All"
        />
        <input
          data-testid="filter-by-food-btn"
          className="category-button"
          onClick={ () => setType('comida') }
          type="button"
          value="Comidas"
        />
        <input
          data-testid="filter-by-drink-btn"
          className="category-button"
          onClick={ () => setType('bebida') }
          type="button"
          value="Drinks"
        />
      </div>
      <div className="recipes-section">
        {
          favorites.map((recipe, index) => {
            if (recipe.type === type || type === '') {
              let urlLinkDetail = '';
              let newIndex = zero;
              if (recipe.type === 'comida') {
                urlLinkDetail = `/comidas/${recipe.id}`;
              } else if (recipe.type === 'bebida') {
                urlLinkDetail = `/bebidas/${recipe.id}`;
              }
              if (type === 'bebida') {
                newIndex = foods;
              }
              return (
                <div key={ index }>
                  <Link to={ urlLinkDetail }>
                    <img
                      data-testid={ `${index - newIndex}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      width={ `${pixels}px` }
                    />
                  </Link>
                  <p data-testid={ `${index - newIndex}-horizontal-top-text` }>
                    {
                      recipe.type === 'comida'
                        ? `${recipe.area} - ${recipe.category}`
                        : recipe.alcoholicOrNot
                    }
                  </p>
                  <h1>{ index - newIndex }</h1>
                  <Link to={ urlLinkDetail }>
                    <h3 data-testid={ `${index - newIndex}-horizontal-name` } className="recipe-name">
                      { recipe.name }
                    </h3>
                  </Link>
                  <input
                    id={ `${recipe.id},${recipe.type}` }
                    type="image"
                    data-testid={ `${index - newIndex}-horizontal-share-btn` }
                    className="share-btn"
                    src={ shareIcon }
                    alt="Share recipe"
                    onClick={ ({ target }) => handleShareIcon(target) }
                  />
                  <p className={ `copied-link-${recipe.id}` } />
                  <input
                    type="image"
                    id={ `${recipe.id}` }
                    data-testid={ `${index - newIndex}-horizontal-favorite-btn` }
                    src={ recipeIsFavorite(recipe) ? blackHeartIcon : whiteHeartIcon }
                    alt="Favorite recipe"
                    onClick={ saveToLocalStorage }
                  />
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
}

export default FavoritesRecipes;
