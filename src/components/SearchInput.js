import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinks, fetchMeal } from '../services/index';
import { bebida, comida } from '../actions';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      radio: 'ingrediente',
      Meals: [],
      drinks: [],
    };
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.clickApi = this.clickApi.bind(this);
    this.redirectFromState = this.redirectFromState.bind(this);
  }

  componentDidUpdate() {
    this.redirectFromState();
  }

  redirectFromState() {
    const { Meals, drinks } = this.state;
    const { history } = this.props;
    if (Meals !== null && Meals.length === 1) {
      history.push(`/comidas/${Meals[0].idMeal}`);
    }
    if (drinks !== null && drinks.length === 1) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }

  async clickApi() {
    const {
      history: { location: { pathname } },
      dispatchDrinks,
      dispatchMeals } = this.props;
    const { search, radio } = this.state;
    if (pathname === '/comidas') {
      if (radio === 'primeira-letra' && search.length > 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const responseApi = await fetchMeal(search, radio);
        this.setState({ Meals: responseApi });
        if (responseApi !== null) dispatchMeals(responseApi);
        if (responseApi === null) {
          window.alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
      }
    } else if (pathname === '/bebidas') {
      if (radio === 'primeira-letra' && search.length > 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const responseApi = await fetchDrinks(search, radio);
        this.setState({
          drinks: responseApi,
        });
        if (responseApi !== null) dispatchDrinks(responseApi);
        if (responseApi === null) {
          window.alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
      }
    }
  }

  searchHandleChange(event, name) {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="toogle-search-input">
        <input
          data-testid="search-input"
          onChange={ (event) => this.searchHandleChange(event, 'search') }
        />
        <div className="radio-input-div">
          <div className="radio-input-second-div">
            <label htmlFor="ingrediente">
              <input
                data-testid="ingredient-search-radio"
                id="ingrediente"
                type="radio"
                name="search-filter"
                value="ingrediente"
                onChange={ (event) => this.searchHandleChange(event, 'radio') }
              />
              Ingrediente
            </label>
            <label htmlFor="nome">
              <input
                id="nome"
                type="radio"
                name="search-filter"
                value="nome"
                data-testid="name-search-radio"
                onChange={ (event) => this.searchHandleChange(event, 'radio') }
              />
              Nome
            </label>
            <label htmlFor="primeira-letra">
              <input
                data-testid="first-letter-search-radio"
                id="primeira-letra"
                type="radio"
                name="search-filter"
                value="primeira-letra"
                onChange={ (event) => this.searchHandleChange(event, 'radio') }
              />
              Primeira Letra
            </label>
          </div>
          <div className="search-button-div">
            <button
              type="button"
              onClick={ this.clickApi }
              data-testid="exec-search-btn"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(comida(meals)),
  dispatchDrinks: (drinks) => dispatch(bebida(drinks)),
});

SearchInput.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchMeals: PropTypes.func.isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchInput);
