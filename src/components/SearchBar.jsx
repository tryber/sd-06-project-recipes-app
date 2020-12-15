import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function SearchBar({ requestAPI }) {
  const { setSearchType, setSearchInput, searchInput } = useContext(ReceitasContext);
  const one = /.{1,}/;

  return (
    <nav className="searchBar-container">
      <section className="searchBar-radios">
        <section className="searchBar-radio">
          <label className="search-label" htmlFor="ingrediente">
            <input
              data-testid="ingredient-search-radio"
              onClick={ () => setSearchType('ingredient') }
              type="radio"
              defaultChecked
              name="radio"
              id="ingrediente"
              className="radio"
            />
            {/* <span className="checkmark" /> */}
            Ingrediente
          </label>
        </section>
        <section className="searchBar-radio">
          <label className="search-label" htmlFor="first-letter">
            <input
              onClick={ () => setSearchType('firstLetter') }
              data-testid="first-letter-search-radio"
              type="radio"
              name="radio"
              id="first-letter"
              className="radio"
            />
            {/* <span className="checkmark" /> */}
            Primeira letra
          </label>
        </section>
        <section className="searchBar-radio">
          <label className="search-label" htmlFor="name">
            <input
              onClick={ () => setSearchType('itemName') }
              data-testid="name-search-radio"
              type="radio"
              name="radio"
              id="name"
              className="radio"
            />
            {/* <span className="checkmark" /> */}
            Nome
          </label>
        </section>
        <button
          onClick={ requestAPI }
          type="button"
          data-testid="exec-search-btn"
          disabled={ searchInput < one }
          className="searchBar-buscar"
        >
          Buscar
        </button>
      </section>
      <input
        onChange={ ({ target }) => setSearchInput(target.value) }
        type="text"
        data-testid="search-input"
        className="searchBar-input"
        placeholder="Digite aqui..."
      />
    </nav>
  );
}

SearchBar.propTypes = {
  requestAPI: propTypes.func.isRequired,
};

export default SearchBar;
