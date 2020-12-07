import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/card.css';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const recipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const location = useLocation().pathname;
  const history = useHistory();

  const handleClickFavorite = (recipeType) => {
    if (!recipeType) {
      if (recipeStorage) {
        setFavorites(recipeStorage);
      }
    } else {
      const allRecipes = [];
      recipeStorage.forEach((recipe) => {
        if (recipe.type === recipeType) {
          allRecipes.push(recipe);
        }
      });
      setFavorites(allRecipes);
    }
  };

  useEffect(() => {
    setFavorites(recipeStorage);
  }, []);

  const handleShareIcon = () => {
    const zero = 0;
    const menosUm = -1;
    let fullPath = '';
    if (location.substr(location.length - 1) === '/') {
      fullPath = `http://localhost:3000${location.slice(zero, menosUm)}`;
    } else {
      fullPath = `http://localhost:3000${location}`;
    }
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.container-cards').appendChild(linkCopy);
  };

  const handleFavoriteRecipes = ({ target }) => {
    recipeStorage.forEach((recipe, index) => {
      if (recipe.id === target.id) {
        recipeStorage.splice(index, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
        setFavorites(recipeStorage);
      }
    });
  };

  const noFavRecipes = () => (
    <div className="favorite-message">
      <h5>Você não tem receitas favoritas!</h5>
    </div>);

  const renderFavorites = () => (
    <div className="container-card">
      {
        favorites.map((recipe, index) => (
          <div key={ index } className="recipe-card">
            <img
              className="img-card"
              aria-hidden="true"
              width="45%"
              src={ recipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              onClick={
                () => (recipe.type === 'comida'
                  ? history.push(`/comidas/${recipe.id}`)
                  : history.push(`/bebidas/${recipe.id}`))
              }
            />
            <div className="recipe-card-text">
              { recipe.type === 'comida' ? (
                <h6
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${recipe.area} - ${recipe.category}`}
                </h6>
              ) : (
                <h6
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }
                </h6>
              ) }
              <h5
                aria-hidden="true"
                data-testid={ `${index}-horizontal-name` }
                onClick={
                  () => (recipe.type === 'comida'
                    ? history.push(`/comidas/${recipe.id}`)
                    : history.push(`/bebidas/${recipe.id}`))
                }
              >
                { recipe.name }
              </h5>
              <div className="icons-card">
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShareIcon() }
                  aria-hidden="true"
                />
                <img
                  src={ blackHeartIcon }
                  alt="favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  id={ recipe.id }
                  onClick={ handleFavoriteRecipes }
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="container-category">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFavorite() }
          className="btn btn-light btn-sm btn-border"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClickFavorite('comida') }
          className="btn btn-light btn-sm btn-border"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFavorite('bebida') }
          className="btn btn-light btn-sm btn-border"
        >
          Drinks
        </button>
      </div>
      <div>
        {favorites ? renderFavorites() : noFavRecipes()}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
