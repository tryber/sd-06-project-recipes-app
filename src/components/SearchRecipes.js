import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeIsFetchin, sendData } from '../redux/actions/searchRecipes';

function SearchRecipes({ dispatchFetching, dispatchData }) {
  const [inputText, setInputText] = useState('');
  const [radioSearchSelection, setRadioSearchSelection] = useState('ingredients');

  const handleSubmitSearch = () => {
    if (radioSearchSelection !== 'firstLetter' || inputText.length === 1) {
      dispatchFetching(true);
      dispatchData({
        inputText,
        radioSearchSelection,
      });
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const renderSearchRecipeTextInput = () => (
    <input
      className="main__search__input"
      onChange={ (event) => setInputText(event.target.value) }
      value={ inputText }
      placeholder="buscar receita"
      data-testid="search-input"
      type="text"
    />
  );

  const renderIngredientRadioInput = () => (
    <label
      htmlFor="ingredients"
      className="main__search__radio"
    >
      <input
        type="radio"
        value="ingredients"
        className="main__search__radio-button"
        checked={ radioSearchSelection === 'ingredients' }
        id="ingredients"
        name="radio-search-button"
        data-testid="ingredient-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      ingredientes
    </label>
  );

  const renderNameRadioInput = () => (
    <label
      htmlFor="name"
      className="main__search__radio"
    >
      <input
        type="radio"
        value="name"
        className="main__search__radio-button"
        checked={ radioSearchSelection === 'name' }
        id="name"
        name="radio-search-button"
        data-testid="name-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      nome
    </label>
  );

  const renderFirstLetterRadioInput = () => (
    <label
      htmlFor="first-letter"
      className="main__search__radio"
    >
      <input
        type="radio"
        value="firstLetter"
        className="main__search__radio-button"
        name="radio-search-button"
        checked={ radioSearchSelection === 'firstLetter' }
        id="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ (event) => setRadioSearchSelection(event.target.value) }
      />
      primeira letra

    </label>
  );

  const renderRadioButtons = () => (
    <div className="main__search__radio-buttons-container">
      {renderIngredientRadioInput()}
      {renderNameRadioInput()}
      {renderFirstLetterRadioInput()}
    </div>
  );

  const renderSubmitButton = () => (
    <button
      type="button"
      data-testid="exec-search-btn"
      onClick={ () => handleSubmitSearch() }
    >
      buscar
    </button>
  );

  return (
    <div className="search__bar-container">
      {renderSearchRecipeTextInput()}
      {renderRadioButtons()}
      {renderSubmitButton()}

    </div>);
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetching: (isfetchin) => dispatch(changeIsFetchin(isfetchin)),
  dispatchData: (data) => dispatch(sendData(data)),
});

const mapStateToProps = (state) => ({
  recipes: state.searchRecipes.recipes,
  categories: state.searchRecipes.categories,
  siteMap: state.sitemap,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipes);

SearchRecipes.propTypes = {
  dispatchFetching: PropTypes.func.isRequired,
  dispatchData: PropTypes.func.isRequired,

};
