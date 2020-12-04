/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import getMeals from '../services/theMealApi';
import getCockTail from '../services/theCockTailApi';
import addMeals from '../actions/meals';
import addDrinks from '../actions/drinks';

class SearchRadio extends Component {
  constructor() {
    super();

    this.requestFromApi = this.requestFromApi.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      inputRadio: '',
      redirectTo: '',
    };
  }

  handleInput({ target: { name, id } }) {
    this.setState({ [name]: id });
  }

  async requestFromApi() {
    const { searchInput, title, sendMeals, sendCockTail } = this.props;
    const { inputRadio } = this.state;
    const displayAlert = () => (
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    );
    const inputValue = {
      ingrediente: 'filter.php?i',
      nome: 'search.php?s',
      'primeira-letra': 'search.php?f',
    };

    if (inputRadio === 'primeira-letra' && searchInput.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const endPointString = `${inputValue[inputRadio]}=${searchInput}`;

    if (title === 'Comidas') {
      const { meals } = await getMeals(endPointString); // Apple Frangipan Tart

      if (meals && meals.length === 1) {
        const { idMeal } = meals[0];
        sendMeals(meals);
        return this.setState({ redirectTo: `/comidas/${idMeal}` });
      }
      return meals ? sendMeals(meals) : displayAlert();
    }

    const { drinks } = await getCockTail(endPointString); // Avalon
    if (drinks && drinks.length === 1) {
      const { idDrink } = drinks[0];
      sendCockTail(drinks);
      return this.setState({ redirectTo: `/bebidas/${idDrink}` });
    }
    return drinks ? sendCockTail(drinks) : displayAlert();
  }

  render() {
    const { redirectTo } = this.state;
    return (
      <div>
        <label htmlFor="ingrediente">
          <input
            name="inputRadio"
            id="ingrediente"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ this.handleInput }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            name="inputRadio"
            id="nome"
            type="radio"
            data-testid="name-search-radio"
            placeholder="Nome"
            onChange={ this.handleInput }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            name="inputRadio"
            id="primeira-letra"
            type="radio"
            data-testid="first-letter-search-radio"
            placeholder="Primeira Letra"
            onChange={ this.handleInput }
          />
          Primeira letra
        </label>
        <button
          type="button"
          onClick={ this.requestFromApi }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
        {redirectTo && <Redirect to={ redirectTo } />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMeals: (meals) => dispatch(addMeals(meals)),
  sendCockTail: (drinks) => dispatch(addDrinks(drinks)),
});

SearchRadio.propTypes = {
  searchInput: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sendMeals: PropTypes.func.isRequired,
  sendCockTail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchRadio);
