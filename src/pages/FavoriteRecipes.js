import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const alcoholic = favorites.map((e) => e.alcoholicOrNot);
  const [copied, setCopied] = useState(false);

  function handleRemove(index) {
    favorites.splice(index, 1);
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    window.location.reload();
  }

  function handleShareClick(item) {
    clipboardCopy(`http://localhost:3000/comidas/${item}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="favorite-filters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favorites.map((e, index) => (
        <div key={ index } className="fav-card">
          <Link to={ `/${e.type}s/${e.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              { `${e.name}`}
            </p>

            <img
              src={ e.image }
              alt="foto"
              className="fav-img"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${e.area} - ${e.category}` }
            {alcoholic[index]}
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareClick(e.id) }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
            Share
          </button>
          {(copied) && <span>Link copiado!</span>}

          <button
            type="button"
            onClick={ () => handleRemove(index) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="blackHeart" />
            Remove Favorite
          </button>
        </div>
      ))}
    </div>
  );
}
