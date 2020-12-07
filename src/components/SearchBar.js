import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';

function SearchBar(props) {
  const { fetchApi } = props;
  const {
    setSelectedRadio, setSearchText, setIdRecipe, setRecipes,
  } = useContext(ContextRecipes);

  const location = useLocation().pathname;

  const history = useHistory();

  const renderCards = (recipeApi) => {
    if (recipeApi === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipeApi.length === 1) {
      if (location.includes('comidas')) {
        const idRecipe = recipeApi[0].idMeal;
        setIdRecipe(idRecipe);
        history.push(`/comidas/${idRecipe}`);
      } else {
        const idRecipe = recipeApi[0].idDrink;
        setIdRecipe(idRecipe);
        history.push(`/bebidas/${idRecipe}`);
      }
    }
  };

  const handleClick = async () => {
    const selectedRadio = document.querySelector('input[name="search"]:checked').value;
    const inputSearch = document.querySelector('#search-input').value;
    const recipesApi = await fetchApi(selectedRadio, inputSearch);
    console.log(recipesApi);
    setSearchText(inputSearch);
    setSelectedRadio(selectedRadio);
    renderCards(recipesApi);
    if (recipesApi !== null) {
      setRecipes(recipesApi);
    }
  };

  return (
    <form className="form-search">
      <div>
        <input
          type="text"
          data-testid="search-input"
          id="search-input"
          className="input-group-text search-input"
        />
      </div>
      <div className="form-container">
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="ingredient"
            name="search"
            data-testid="ingredient-search-radio"
            id="ingredient"
          />
          <label htmlFor="ingredient" className="form-check-label">
            Ingrediente
          </label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="name"
            name="search"
            data-testid="name-search-radio"
            id="name"
          />
          <label htmlFor="name" className="form-check-label">
            Nome
          </label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="first-letter"
            name="search"
            data-testid="first-letter-search-radio"
            id="first-letter"
          />
          <label htmlFor="first-letter" className="form-check-label">
            Primeira letra
          </label>
        </div>
      </div>
      <div className="btn-search">
        <button
          className="btn btn-secundary"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};

export default SearchBar;
