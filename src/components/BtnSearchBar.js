import React, { useContext } from 'react';
import recipesAppContext from '../context/recipesAppContext';
import { searchIcon } from '../images';

export default function BtnSearchBar() {
  const { searchBar, setSearchBar } = useContext(recipesAppContext);

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  return (
    <button
      type="button"
      className="btn-header"
      src={ searchIcon }
      data-testid="search-top-btn"
      onClick={ handleSearchBar }
    >
      <img alt="ícone de Pesquisa" src={ searchIcon } />
    </button>
  );
}
