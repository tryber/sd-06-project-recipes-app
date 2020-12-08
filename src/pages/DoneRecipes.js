import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesButtons from '../components/RecipesButtons';
import ShareButton from '../components/ShareButton';

export default function DoneRecipes() {
  const ZERO = 0;
  const doneRecipesStorage = localStorage.getItem('doneRecipes'); // TROCAR favoriteRecipes POR doneRecipes
  const doneList = JSON.parse(doneRecipesStorage);
  const [selectedFilter, setselectedFilter] = useState('All');

  let filteredResults;
  if (selectedFilter === 'All') filteredResults = (doneList) ? [...doneList] : [];
  if (selectedFilter === 'Meal') {
    filteredResults = doneList
      .filter((item) => item.type === selectedFilter || item.type === 'comida');
  }
  if (selectedFilter === 'Drink') {
    filteredResults = doneList
      .filter((item) => item.type === selectedFilter || item.type === 'bebida');
  }

  const detailRoute = (id, type) => {
    const drinkOrFood = (type === 'Meal' || type === 'comida')
      ? '/comidas/' : '/bebidas/';
    return `${drinkOrFood}${id}`;
  };

  return (
    <div>
      <RecipesButtons setselectedFilter={ setselectedFilter } />
      {doneList && filteredResults.map((item, index) => (
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
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            {(item.tags.length > ZERO) && item.tags.map((tagName, i) => (
              <div
                key={ i }
                className="tagRecipe"
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </div>
            ))}
            {/* Descomentar o código acima quando
            TROCAR favoriteRecipes POR doneRecipes */}
            <ShareButton index={ index } id={ item.id } type={ item.type } />
          </div>
          <div />
        </div>
      ))}
    </div>
  );
}
