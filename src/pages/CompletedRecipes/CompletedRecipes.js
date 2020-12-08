import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/MainHeader/Header';
import { shareIcon } from '../../images';
import { getDoneRecipes } from '../../services/localStorage';
import './style.css';

function CompletedRecipes() {
  const [type, setType] = useState('');
  const doneRecipes = getDoneRecipes();

  const handleShareIcon = (target) => {
    const keys = target.id.split(',');
    let urlLinkDetail = '';
    if (keys[1] === 'comida') {
      urlLinkDetail = `/comidas/${keys[0]}`;
    } else if (keys[1] === 'bebida') {
      urlLinkDetail = `/bebidas/${keys[0]}`;
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

  return (
    <div>
      <div className="recipes-page-container">
        <Header
          pageTitle="Receitas Feitas"
        />
        <div className="categories">
          <input
            className="category-button"
            data-testid="filter-by-all-btn"
            onClick={ () => setType('') }
            type="button"
            value="All"
          />
          <input
            className="category-button"
            data-testid="filter-by-food-btn"
            onClick={ () => setType('comida') }
            type="button"
            value="Comidas"
          />
          <input
            className="category-button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setType('bebida') }
            type="button"
            value="Bebidas"
          />
        </div>
        <div className="header-container">
          {doneRecipes.map((recipe, index) => {
            if (recipe.type === type || type === '') {
              let urlLinkDetail = '';
              if (recipe.type === 'comida') {
                urlLinkDetail = `/comidas/${recipe.id}`;
              } else if (recipe.type === 'bebida') {
                urlLinkDetail = `/bebidas/${recipe.id}`;
              }
              return (
                <div className="recipe-card">
                  <Link to={ urlLinkDetail }>
                    <img
                      className="recipe-thumb"
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                    />
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {
                      recipe.type === 'comida'
                        ? `${recipe.area} - ${recipe.category}`
                        : recipe.alcoholicOrNot
                    }
                  </p>
                  <Link to={ urlLinkDetail }>
                    <h2 className="recipe-name" data-testid={ `${index}-horizontal-name` }>
                      { recipe.name }
                    </h2>
                  </Link>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    { `Feita em: ${recipe.doneDate}` }
                  </p>
                  <input
                    id={ `${recipe.id},${recipe.type}` }
                    type="image"
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="share-btn"
                    src={ shareIcon }
                    alt="Share recipe"
                    onClick={ ({ target }) => handleShareIcon(target) }
                  />
                  <p className={ `copied-link-${recipe.id}` } />
                  {recipe.tags.split(',').map((tagName) => (
                    <p
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                      key={ tagName }
                    >
                      { tagName }
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default CompletedRecipes;
