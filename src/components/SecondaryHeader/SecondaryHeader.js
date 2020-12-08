import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../../images';
import recipesAppContext from '../../context/recipesAppContext';
import { favoriteRecipe, recipeIsFavorite } from '../../services/localStorage';
import './style.css';

function SecondaryHeader({ name, img, category }) {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  let a = isFavorite;
  const b = a;
  a = b;

  const {
    recipesMeals,
    recipesDrinks,
  } = useContext(recipesAppContext);

  const myRecipe = location.pathname.includes('comidas') ? recipesMeals : recipesDrinks;

  let url;
  if ('idMeal' in myRecipe) {
    url = `http://localhost:3000/comidas/${myRecipe.idMeal}`;
  } else if ('idDrink' in myRecipe) {
    url = `http://localhost:3000/bebidas/${myRecipe.idDrink}`;
  }

  const handleShareIcon = () => {
    navigator.clipboard.writeText(url);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector('.copied-link');
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };

  const handleFavoriteRecipe = () => {
    setIsFavorite(recipeIsFavorite(myRecipe));
  };

  useEffect(() => {
    handleFavoriteRecipe();
  }, [myRecipe]);

  const saveToLocalStorage = () => {
    favoriteRecipe(myRecipe);
    handleFavoriteRecipe(myRecipe);
  };

  return (
    <div className="header-container">
      <header className="secondary-header">
        <img
          className="image-secondary-header"
          data-testid="recipe-photo"
          alt={ `Receita: ${name}` }
          src={ img }
        />
        <div className="main-info">
          <h1 data-testid="recipe-title" className="header-title">{ name }</h1>
          <p data-testid="recipe-category" className="category">{ category }</p>
        </div>
        <div className="header-icons">
          <input
            type="image"
            data-testid="share-btn"
            className="share-btn"
            src={ shareIcon }
            alt="Share recipe"
            onClick={ handleShareIcon }
          />
          <p className="copied-link" />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ recipeIsFavorite(myRecipe) ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite recipe"
            onClick={ saveToLocalStorage }
          />
        </div>
      </header>
    </div>
  );
}

SecondaryHeader.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};

export default SecondaryHeader;
