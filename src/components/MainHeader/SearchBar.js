import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import recipesAppContext from '../../context/recipesAppContext';
import './style.css';

export default function SearchBar() {
  const [filterType, setFilterType] = useState('');
  const [product, setProduct] = useState('');
  const { setFetchMeal, setFetchDrink } = useContext(recipesAppContext);

  const searchMeal = async () => {
    const meal = await setFetchMeal(filterType, product);
    if (!meal) {
      return null;
    }
    const id = meal.result.meals[0].idMeal;
    if (meal.redirect) {
      return window.location.replace(`/comidas/${id}`);
    }
  };

  const searchDrink = async () => {
    const drink = await setFetchDrink(filterType, product);
    if (!drink) {
      return null;
    }
    const id = drink.result.drinks[0].idDrink;
    if (drink.redirect) {
      return window.location.replace(`/bebidas/${id}`);
    }
  };

  const { pathname } = useLocation();

  const handleSearch = () => {
    if (filterType === 'firstLetter' && product.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas') {
      searchMeal(filterType, product);
    } else if (pathname === '/bebidas') {
      searchDrink(filterType, product);
    }
  };

  const validateForm = () => {
    if (filterType && product) {
      handleSearch(filterType, product);
    } else {
      alert('Preencha o campo de busca e o filtro');
    }
  };

  return (
    <div className="searchBar-container">
      <form className="form-group searchBar">
        <div className="col-sm-6 inputForm">
          <input
            placeholder="Chicken"
            className="form-control"
            data-testid="search-input"
            type="text"
            required
            onChange={ (e) => setProduct(e.target.value) }
          />
        </div>
        <div className="radioBtns">
          <div>
            <label className="form-check-label" htmlFor="ingredient">
              <input
                data-testid="ingredient-search-radio"
                className="form-check-input"
                type="radio"
                id="ingredient"
                name="filter-info"
                value="ingredient"
                required
                onChange={ (e) => setFilterType(e.target.value) }
              />
              Ingrediente
            </label>
          </div>
          <div>
            <label className="form-check-label" htmlFor="name">
              <input
                data-testid="name-search-radio"
                className="form-check-input"
                type="radio"
                id="name"
                name="filter-info"
                value="name"
                required
                onChange={ (e) => setFilterType(e.target.value) }
              />
              Nome
            </label>
          </div>
          <div>
            <label className="form-check-label" htmlFor="firstLetter">
              <input
                data-testid="first-letter-search-radio"
                className="form-check-input"
                type="radio"
                id="firstLetter"
                name="filter-info"
                value="firstLetter"
                required
                onChange={ (e) => setFilterType(e.target.value) }
              />
              Primeira Letra
            </label>
          </div>
        </div>
        <div className="btnForm">
          <button
            data-testid="exec-search-btn"
            className="button"
            type="button"
            onClick={ () => validateForm(filterType, product) }
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
