import React, { useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function SearchBar() {
  const { setSearchItens } = useContext(RecipeContext);

  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleClickSearch = ({ target: { value } }) => {
    setSearchRadio(value);
  };

  const handleClickSearchItens = (e) => {
    e.preventDefault();
    if (searchRadio !== '' || searchInput !== '') {
      setSearchItens({ searchInput, searchRadio });
    }
  };

  return (
    <div className="search-container">
      <form>
        <div>
          <input
            type="text"
            placeholder="Buscar receita"
            data-testid="search-input"
            onChange={ handleChange }
            className="input-search"
          />
        </div>

        <div className="options">
          <label>
            <input
              type="radio"
              value="Nome"
              name="tipo"
              data-testid="name-search-radio"
              onClick={ handleClickSearch }
            />
            Nome
          </label>

          <label>
            <input
              type="radio"
              value="Ingrediente"
              name="tipo"
              data-testid="ingredient-search-radio"
              onClick={ handleClickSearch }
            />
            Ingrediente
          </label>

          <label>
            <input
              type="radio"
              value="PrimeiraLetra"
              name="tipo"
              data-testid="first-letter-search-radio"
              onClick={ handleClickSearch }
            />
            Primeira Letra
          </label>
        </div>

        <div>
          <button
            type="submit"
            data-testid="exec-search-btn"
            onClick={ handleClickSearchItens }
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
