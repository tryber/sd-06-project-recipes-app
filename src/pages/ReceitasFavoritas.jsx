import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import buttonShare from '../styles/images/shareIcon.svg';
import '../styles/imgBig.css';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { loadState, saveState } from '../services/localStorage';
import '../styles/marginHederAndFooter.css';
import '../styles/ReceitasFinalizadas.css';
import '../styles/FavoriteHeart.css';

function ReceitasFavoritas() {
  const favoriteRecipes = 'favoriteRecipes';
  const [
    localStorageFavoriteRecipes,
    setLocalStorageFavoriteRecipes,
  ] = useState(loadState(favoriteRecipes, []));

  const copyBoard = (id, type) => {
    let url = '';
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
    } else {
      url = `http://localhost:3000/bebidas/${id}`;
    }
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById(id);
    divBtns.innerHTML = 'Link copiado!';
  };

  const All = 'All';
  const Food = 'Food';
  const Drink = 'Drink';

  const [categoryFilter, setCategoryFilter] = useState(All);

  const onClickFilter = (typeFilter) => {
    setCategoryFilter(typeFilter);
  };

  const filterFavorites = () => {
    if (categoryFilter === All) {
      return localStorageFavoriteRecipes;
    }
    let categoryFilter2 = '';
    if (categoryFilter === Food) categoryFilter2 = 'comida';
    if (categoryFilter === Drink) categoryFilter2 = 'bebida';
    return localStorageFavoriteRecipes
      .filter((objFavorite) => objFavorite.type === categoryFilter2);
  };

  const arrayFilterNames = [
    All,
    Food,
    Drink,
  ];

  const disfavorRecipe = (id) => {
    const loadFavoriteRecipe = loadState(favoriteRecipes, []);

    const response = loadFavoriteRecipe.filter((element) => element.id !== id);

    saveState(favoriteRecipes, response);
    setLocalStorageFavoriteRecipes(loadState(favoriteRecipes, []));
  };

  return (
    <div className="container-margin-heder ">
      <Header name="Receitas Favoritas" button={ false } />
      {arrayFilterNames.map((Filter) => {
        const lowerCaseFilter = Filter.toLowerCase();
        return (
          <button
            className="category-food-btn-receitas"
            key={ Filter }
            type="button"
            data-testid={ `filter-by-${lowerCaseFilter}-btn` }
            onClick={ () => onClickFilter(Filter) }
          >
            { Filter }
          </button>
        );
      })}
      <div>
        {filterFavorites().map(({
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
        }, index) => (
          <div
            className="container-card-food"
            key={ index }
          >
            <Link to={ `/${type}s/${id}` }>
              <img
                className="imgBig"
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="conteudo-card">
              {(type === 'comida') && (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </span>
              )}
              {(type === 'bebida') && (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { alcoholicOrNot }
                </span>
              )}
              <Link to={ `/${type}s/${id}` }>
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </span>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={ () => copyBoard(id, type) }
                  className="btn-copy-link"
                >
                  <img
                    src={ buttonShare }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="img-button-share"
                  />
                </button>
                <span id={ id } />
                <br />
                <button
                  type="button"
                  onClick={ () => disfavorRecipe(id) }
                  className="favorite-btn"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="img-button-fav"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
