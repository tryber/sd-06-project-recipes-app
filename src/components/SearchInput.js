import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchInput() {
  const { valueInput, setValueInput } = useContext(RecipesContext);

  return (
    <input
      type="text"
      placeholder="search"
      data-testid="search-input"
      onChange={ (e) => setValueInput(e.target.value) }
      value={ valueInput }
    />
  );
}

export default SearchInput;
