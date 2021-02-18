import React from 'react';

export default function RecipeTypeButtons() {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        date-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>

    </div>
  );
}
