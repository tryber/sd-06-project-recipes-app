import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const alcoholic = favorites.map((e) => e.alcoholicOrNot);
  const itemUrl = useLocation().pathname;
  const [copied, setCopied] = useState(false);

  function handleRemove(index) {
    favorites.splice(index, 1);
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    window.location.reload();
  }

  function handleShareClick() {
    clipboardCopy(`http://localhost:3000${itemUrl}`);
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
              { `Nome: ${e.name}`}
            </p>

            <img
              src={ e.image }
              alt="foto"
              className="fav-img"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            { `Categoria: ${e.category}` }
          </p>

          <p>
            { `Area: ${e.area}`}
          </p>

          <p>
            {alcoholic[index]}
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShareClick }
          >
            Share
          </button>
          <div>
            {(copied) && <span>Link copiado!</span>}
          </div>

          <button
            type="button"
            onClick={ () => handleRemove(index) }
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            Remove Favorite
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
}
