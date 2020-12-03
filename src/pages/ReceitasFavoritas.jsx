import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import buttonShare from '../styles/images/shareIcon.svg';
import '../styles/ReceitasFavoritas.css';
import '../styles/imgBig.css';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { loadState, saveState } from '../services/localStorage';

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
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
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
    <div>
      <Header name="Receitas Favoritas" button={ false } />
      {arrayFilterNames.map((Filter) => {
        const lowerCaseFilter = Filter.toLowerCase();
        return (
          <button
            key={ Filter }
            type="button"
            data-testid={ `filter-by-${lowerCaseFilter}-btn` }
            onClick={ () => onClickFilter(Filter) }
          >
            { Filter }
          </button>
        );
      })}
      <div className="container-favoritas">
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
            {(type === 'comida') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${area} - ${category}` }
              </p>
            )}
            {(type === 'bebida') && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { alcoholicOrNot }
              </p>
            )}
            <Link to={ `/${type}s/${id}` }>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </h2>
            </Link>
            <div id="btns">
              <button
                type="button"
                onClick={ () => copyBoard(id, type) }
              >
                <img
                  src={ buttonShare }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="img-button-share"
                />
              </button>
              <button type="button" onClick={ () => disfavorRecipe(id) }>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="img-button-fav"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
