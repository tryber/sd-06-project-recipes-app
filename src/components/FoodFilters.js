import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function FoodFilters() {
  const { filtersData, selectedFilter, setSelectedFilter } = useContext(ReceitasContext);

  const filterByCategory = ({ target }) => {
    if (target.innerHTML === 'All') {
      setSelectedFilter('');
    } else {
      return (
        (selectedFilter === target.innerHTML)
          ? setSelectedFilter('')
          : setSelectedFilter(target.innerHTML)
      );
    }
  };

  return (
    <div className="row justify-content-center mb-2">
      {filtersData.map((filter) => (
        <button
          key={ filter }
          type="button"
          data-testid={ `${filter}-category-filter` }
          className="btn btn-secondary btn-sm m-1 w-25"
          style={ { background: '#6CDC3E', color: 'black' } }
          onClick={ filterByCategory }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FoodFilters;
