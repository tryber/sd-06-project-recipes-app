import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealAPI, fetchDrinkAPI } from '../services/foodAPI';
import { saveFoodSearch, saveDrinksSearch } from '../redux/actions';

function SearchBar({ page, dispatchSaveFood, dispatchSaveDrinks }) {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('');

  async function pageCheckSwitch(pageName) {
    if (pageName === 'Bebidas') {
      const API_RESPONSE = await fetchDrinkAPI(option, searchInput);
      dispatchSaveDrinks(API_RESPONSE);
    } else {
      const API_RESPONSE = await fetchMealAPI(option, searchInput);
      dispatchSaveFood(API_RESPONSE);
    }
  }

  function handleButtonClick() {
    if (!searchInput || !option) {
      return customAlert('Please select an option or input some search parameter');
    } if (option === 'first-letter' && searchInput.length > 1) {
      return customAlert('Sua busca deve conter somente 1 (um) caracter');
    }
    pageCheckSwitch(page);

    return null;
  }

  return (
    <div>
      <input
        onChange={ (event) => setSearchInput(event.target.value) }
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
      />
      <label htmlFor="search-ingredient">
        <input
          name="search-radio"
          type="radio"
          id="search-ingredient"
          data-testid="ingredient-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Ingrediente
      </label>
      <label htmlFor="search-name">
        <input
          name="search-radio"
          type="radio"
          id="search-name"
          data-testid="name-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          name="search-radio"
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ (event) => setOption(event.nativeEvent.target.id) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButtonClick }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
  dispatchSaveFood: PropTypes.func.isRequired,
  dispatchSaveDrinks: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveFood: (payload) => dispatch(saveFoodSearch(payload)),
  dispatchSaveDrinks: (payload) => dispatch(saveDrinksSearch(payload)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
