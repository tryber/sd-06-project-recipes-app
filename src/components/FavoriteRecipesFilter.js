import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../css/DoneRecipes.css';

function FavoriteRecipesFilter() {
  const { setFavoriteFilter } = useContext(RecipesContext);

  const onClick = (target) => {
    const { value } = target;

    setFavoriteFilter(value);
  };

  return (
    <div className="profile-filter-container">
      <button
        className="btn-filter-profile"
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => onClick(target) }
        type="button"
        value="all"
      >
        All
      </button>
      <button
        className="btn-filter-profile"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => onClick(target) }
        type="button"
        value="comida"
      >
        Food
      </button>
      <button
        className="btn-filter-profile"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => onClick(target) }
        type="button"
        value="bebida"
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteRecipesFilter;
