import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesButtons from '../components/RecipesButtons';
import ShareButton from '../components/ShareButton';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const favoriteRecipesStorage = localStorage.getItem('favoriteRecipes');
  const favoriteList = JSON.parse(favoriteRecipesStorage);
  const [selectedFilter, setselectedFilter] = useState('All');
  const [update, setupdate] = useState(true);

  let filteredResults;
  if (selectedFilter === 'All') filteredResults = (favoriteList) ? [...favoriteList] : [];
  if (selectedFilter === 'Meal') {
    filteredResults = favoriteList
      .filter((item) => item.type === selectedFilter || item.type === 'comida');
  }
  if (selectedFilter === 'Drink') {
    filteredResults = favoriteList
      .filter((item) => item.type === selectedFilter || item.type === 'bebida');
  }
  const detailRoute = (id, type) => {
    const drinkOrFood = (type === 'Meal' || type === 'comida')
      ? '/comidas/' : '/bebidas/';
    return `${drinkOrFood}${id}`;
  };

  useEffect(() => {
    // console.log('update');
  }, [update]);

  function handleLocalStorage(id) {
    const newLocalStorageFavorites = favoriteList;
    newLocalStorageFavorites
      .splice(favoriteList
        .indexOf(favoriteList
          .find((favorite) => favorite.id === id)), 1);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(favoriteList));
    setupdate(!update);
  }

  return (
    <div>
      <RecipesButtons setselectedFilter={ setselectedFilter } />
      {favoriteList && filteredResults.map((item, index) => (
        <div key={ index } className="cardRecipe">
          <Link to={ () => detailRoute(item.id, item.type) }>
            <img
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
              className="imageCardRecipe"
            />
          </Link>
          <div className="textBoxCard">
            {(item.type === 'Meal' || item.type === 'comida')
              ? (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {item.area}
                  {' '}
                  -
                  {' '}
                  {item.category}
                </span>
              )
              : ''}
            {(item.type === 'Drink' || item.type === 'bebida')
              ? (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </span>
              )
              : ''}
            <Link to={ () => detailRoute(item.id, item.type) }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {item.name}
              </h3>
            </Link>
            <button
              className="button-standard"
              type="button"
              data-testid="handle-local-storage-btn"
              onClick={ () => handleLocalStorage(item.id) }
            >
              <img
                src={ BlackHeartIcon }
                alt="Favorite Button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <ShareButton index={ index } id={ item.id } type={ item.type } />
          </div>
          <div />
        </div>
      ))}
    </div>
  );
}
