import React, {
  useCallback, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import Header from '../../components/Header';

import { useCook } from '../../hooks/cook';

import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const { doneRecipes } = useCook();

  const [copyLink, setCopyLink] = useState({});

  const [filter, setFilter] = useState('all');

  const filteredItems = useMemo(() => {
    switch (filter) {
    case 'foods':
      return doneRecipes.filter((recipe) => recipe.type === 'comida');
    case 'drinks':
      return doneRecipes.filter((recipe) => recipe.type === 'bebida');
    default:
      return doneRecipes;
    }
  }, [doneRecipes, filter]);

  const handleFilterChange = useCallback(({ target }) => {
    const { value: filterClicked } = target;

    setFilter(filterClicked);
  }, []);

  const handleShareClick = useCallback(async (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;

    await copy(url);

    const copiedRecipe = {
      [id]: true,
    };

    setCopyLink(copiedRecipe);
  }, []);

  return (
    <div className="done-recipes-page">
      <Header pageName="Receitas Feitas" />

      <div className="done-filters-container">
        <label htmlFor="all" data-testid="filter-by-all-btn">
          <input
            type="radio"
            name="filter"
            id="all"
            value="all"
            checked={ filter === 'all' }
            onChange={ handleFilterChange }
          />
          All
        </label>
        <label htmlFor="foods" data-testid="filter-by-food-btn">
          <input
            type="radio"
            name="filter"
            id="foods"
            value="foods"
            onChange={ handleFilterChange }
            checked={ filter === 'foods' }

          />
          Foods
        </label>
        <label htmlFor="drinks" data-testid="filter-by-drink-btn">
          <input
            type="radio"
            name="filter"
            id="drinks"
            value="drinks"
            checked={ filter === 'drinks' }
            onChange={ handleFilterChange }

          />
          Drinks
        </label>
      </div>

      <div className="done-recipes-container">
        {filteredItems.map((recipe, index) => (
          <div className="done-recipe-card" key={ recipe.doneDate.toLocaleString() }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>

            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </p>

            {/* {recipe.type === 'comida' && (
              <p data-testid={`${index}-horizontal-area`}>{recipe.area}</p>
            )} */}

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate.toLocaleString()}
            </p>

            <div className="done-recipe-share-container">
              <button
                type="button"
                onClick={ () => handleShareClick(recipe.id, recipe.type) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share this recipe"
                />
              </button>

              {copyLink[recipe.id] && (
                <p>Link copiado!</p>
              )}
            </div>

            {recipe.type === 'comida' && (
              <div className="recipe-tag-container">
                {recipe.tags.filter((tag, i) => i < 1 + 1).map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
