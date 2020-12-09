import React, { useContext } from 'react';
import Context from '../../context/Context';

const FavDoneRecipesFilters = () => {
  const {
    doneFavRecipeFilter,
    setDoneFavRecipeFilter,
  } = useContext(Context);
  return (
    <div className="category-container">
      <button
        className={
          `btn
          btn-small
          fixed-size
          ${(doneFavRecipeFilter === 'all') ? 'btn-active' : ''}`
        }
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneFavRecipeFilter('all') }
      >
        All
      </button>
      <button
        className={
          `btn
          btn-small
          fixed-size
          ${(doneFavRecipeFilter === 'meals') ? 'btn-active' : ''}`
        }
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setDoneFavRecipeFilter('meals') }
      >
        Food
      </button>
      <button
        className={
          `btn
          btn-small
          fixed-size
          ${(doneFavRecipeFilter === 'drinks') ? 'btn-active' : ''}`
        }
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setDoneFavRecipeFilter('drinks') }
      >
        Drinks
      </button>
    </div>
  );
};

export default FavDoneRecipesFilters;
