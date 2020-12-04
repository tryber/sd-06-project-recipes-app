import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { shareIcon } from '../../images';

function CompletedRecipes() {
  const doneRecipes = [{
    id: '52977',
    type: 'meal',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: false,
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '30-11-2020',
    tags: 'Soup',
  }, {
    id: '52814',
    type: 'meal',
    area: 'Thai',
    category: 'Chicken',
    alcoholicOrNot: false,
    name: 'Thai Green Curry',
    image: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
    doneDate: '28-11-2020',
    tags: 'Curry,Mild',
  }];
  doneRecipes.forEach((recipe) => {
    if (recipe.tags !== null) {
      recipe.tags = recipe.tags.split(',');
    }
  });
  const [type, setType] = useState('');

  const handleShareIcon = (target) => {
    const keys = target.id.split(',');
    let urlLinkDetail = '';
    if (keys[1] === 'meal') {
      urlLinkDetail = `/comidas/${keys[0]}`;
    } else if (keys[1] === 'drink') {
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
      <Header
        className="header"
        pageTitle="Receitas Feitas"
      />
      <div>
        <input
          className="btn btn-secondary"
          onClick={ () => setType('') }
          type="button"
          value="All"
        />
        <input
          className="btn btn-secondary"
          onClick={ () => setType('meal') }
          type="button"
          value="Comidas"
        />
        <input
          className="btn btn-secondary"
          onClick={ () => setType('drink') }
          type="button"
          value="Bebidas"
        />
      </div>
      <div>
        {doneRecipes.map((recipe, index) => {
          if (recipe.type === type || type === '') {
            let urlLinkDetail = '';
            if (recipe.type === 'meal') {
              urlLinkDetail = `/comidas/${recipe.id}`;
            } else if (recipe.type === 'drink') {
              urlLinkDetail = `/bebidas/${recipe.id}`;
            }
            return (
              <div>
                <Link to={ urlLinkDetail }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.category }
                </p>
                <Link to={ urlLinkDetail }>
                  <h2 data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </h2>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
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
                {recipe.tags.map((tagName) => (
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
  );
}

export default CompletedRecipes;
