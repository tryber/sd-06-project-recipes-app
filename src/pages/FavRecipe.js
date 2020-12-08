import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavRecipe() {
  const {
    heart,
    copied,
    favorite,
    share,
  } = useContext(Context);

  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const ZERO = 0;
  const [filter, setFilter] = useState('all');
  const [update, setUpdate] = useState('no');

  const filters = useMemo(() => {
    if (filter === 'comida') {
      return local.filter((item) => item.type === filter);
    } if (filter === 'bebida') {
      return local.filter((item) => item.type === filter);
    }
    return local;
  }, [local, filter]);

  const favorited = (recipe) => {
    favorite(recipe, recipe.type, recipe.id);
    return update === 'update' ? setUpdate('no') : setUpdate('update');
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      {!local || local.length === ZERO ? <h1>Sem receitas favoritas</h1>
        : (
          <div>
            <button
              type="button"
              onClick={ () => setFilter('all') }
              data-testid="filter-by-all-btn"
            >
              All
            </button>
            <button
              type="button"
              onClick={ () => setFilter('comida') }
              data-testid="filter-by-food-btn"
            >
              Food
            </button>
            <button
              type="button"
              onClick={ () => setFilter('bebida') }
              data-testid="filter-by-drink-btn"
            >
              Drinks
            </button>
            {filters.map((recipe, index) => (
              <div key={ recipe.id }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    className="thumbnail"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ `${recipe.type}_favorita` }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.area ? `${recipe.area} - ${recipe.category}`
                    : recipe.alcoholicOrNot}
                </p>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                </Link>
                <input
                  type="image"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share-icon"
                  onClick={ () => share(`/${recipe.type}s/${recipe.id}`) }
                />
                { copied ? <span>Link copiado!</span> : '' }
                <input
                  type="image"
                  src={ heart === 'white' ? whiteHeartIcon : blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt={ heart === 'white' ? 'whiteHeartIcon' : 'blackHeartIcon' }
                  onClick={ () => favorited(recipe) }
                />
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default FavRecipe;
