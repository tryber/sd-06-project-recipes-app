import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { drinksCategoriesOnRender,
  drinksOnRender, filterDrinksByCategory, fetchDrinks } from '../services';
import { bebida, controlState } from '../actions';

class Drink extends React.Component {
  constructor() {
    super();
    this.state = {
      Drinks: [],
      Categories: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
    this.allButtonHandler = this.allButtonHandler.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.setKeyLocalStorage = this.setKeyLocalStorage.bind(this);
    this.manageColors = this.manageColors.bind(this);
  }

  async componentDidMount() {
    this.changeH1Width();
    const { control, dispatchControlState } = this.props;
    let drinksRender;
    const initList = 0;
    const maxList = 12;
    let controlFirstIf = false;
    if (control !== '') {
      controlFirstIf = true;
      const drinksExplorer = await fetchDrinks(control, 'ingrediente');
      drinksRender = drinksExplorer.slice(initList, maxList);
    } else { drinksRender = await drinksOnRender(); }

    const Categories = await drinksCategoriesOnRender();
    this.setInitialState(drinksRender, Categories);
    this.setKeyLocalStorage();
    if (controlFirstIf) { dispatchControlState(''); }
  }

  async componentDidUpdate() {
    const { stateDrinks } = this.props;
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== '') {
      this.manageColors('others');
    } else {
      this.manageColors('all');
    }
    const MAXIMUM_LENGTH = 0;
    if (stateDrinks.length > MAXIMUM_LENGTH) {
      this.stateAfterProps(stateDrinks);
    }
  }

  setKeyLocalStorage() {
    const verifyLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipesInProgress = {
      cocktails: {
      },
      meals: { },
    };
    if (!verifyLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }

  async setCategory({ target }, { strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterDrinksByCategory(strCategory);
      this.setState({ Drinks: filteredFoods, CategoryFilter: strCategory });
      target.style.background = '#ac5c22';
    } else {
      const initialMeals = await drinksOnRender();
      this.setState({ Drinks: initialMeals, CategoryFilter: '' });
      target.style.background = '#5a2d0c';
    }
  }

  manageColors(buttons) {
    const filtros = document.getElementsByClassName('category-buttons');
    const INITIAL_VALUE = 1;
    const FINAL_VALUE = 6;
    if (buttons === 'others') {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        filtros[0].childNodes[i].firstChild.style.background = '#5a2d0c';
        filtros[0].childNodes[FINAL_VALUE].style.background = '#5a2d0c';
      }
    }
    if (buttons === 'all') {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        filtros[0].childNodes[i].firstChild.style.background = '#5a2d0c';
        filtros[0].childNodes[FINAL_VALUE].style.background = '#ac5c22';
      }
    }
  }

  changeH1Width() {
    const h1 = document.querySelector('.global-h1');
    const profileDiv = document.querySelector('.profile-icon-div');
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      h1.style.fontSize = '40px';
      profileDiv.style.width = '105px';
      const searchInputDiv = document.querySelector('.search-input-div');
      searchInputDiv.style.width = '105px';
    }
  }

  stateAfterProps(props) {
    const { dispatchDrinks } = this.props;
    this.setState({ Drinks: props });
    dispatchDrinks([]);
  }

  setInitialState(drinksRender, Categories) {
    this.setState({ Drinks: drinksRender, Categories });
  }

  async allButtonHandler() {
    const initialDrinks = await drinksOnRender();
    this.setState({ Drinks: initialDrinks, CategoryFilter: '' });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push(`/bebidas/${recipe.idDrink}`);
  }

  render() {
    const { history } = this.props;
    const { Drinks, Categories } = this.state;
    const INITIAL_VALUE = 0;
    return (
      <div className="food-drink-container">
        <div className="category-buttons">
          <Header history={ history } />
          {Categories ? Categories.map((element, index) => (
            <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
              <button
                type="button"
                className="drink-filters"
                onClick={ (event) => this.setCategory(event, element) }
              >
                {element.strCategory}
              </button>
            </div>
          )) : ''}
          {Categories.length > INITIAL_VALUE
          && (
            <button
              type="button"
              className="drink-filters"
              data-testid="All-category-filter"
              onClick={ () => this.allButtonHandler() }
            >
              All
            </button>
          )}
        </div>
        <div className="cards-container">
          {Drinks.length > 1 ? Drinks.map((recipe, index) => (
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <input
                type="image"
                width="100%"
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                onClick={ () => this.redirectOnImage(recipe) }
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <hr className="card-hr" />
            </div>
          )) : (
            <div className="foods-drinks-loading">
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Drink.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  stateDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchControlState: PropTypes.func.isRequired,
  control: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinks: (drinks) => dispatch(bebida(drinks)),
  dispatchControlState: (control) => dispatch(controlState(control)),
});

const mapStateToProps = (state) => ({
  stateDrinks: state.menu.drinks,
  control: state.menu.control,
  idCurrent: state.menu.idCurrent,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);
