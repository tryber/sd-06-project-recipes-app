import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../css/DoneRecipes.css';

function DoneRecipesFilter() {
  const { setDoneFilter } = useContext(RecipesContext);

  const onClick = ({ target }) => {
    const { value } = target;

    setDoneFilter(value);
  };

  return (
    <div className="profile-filter-container">
      <button
        className="btn-filter-profile"
        data-testid="filter-by-all-btn"
        onClick={ onClick }
        type="button"
        value="all"
      >
        All
      </button>
      <button
        className="btn-filter-profile"
        data-testid="filter-by-food-btn"
        onClick={ onClick }
        type="button"
        value="comida"
      >
        Food
      </button>
      <button
        className="btn-filter-profile"
        data-testid="filter-by-drink-btn"
        onClick={ onClick }
        type="button"
        value="bebida"
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipesFilter;
