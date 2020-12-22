import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { foodsOnRender, foodsCategoriesOnRender,
  filterFoodsByCategory, fetchMeal } from '../services';
import { comida, controlState } from '../actions';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      Meals: [],
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
    let mealsRender;
    const initList = 0;
    const maxList = 12;
    let controlFirstIf = false;
    if (control !== '') {
      controlFirstIf = true;
      const mealsExplorer = await fetchMeal(control, 'ingrediente');
      mealsRender = await mealsExplorer.slice(initList, maxList);
    } else { mealsRender = await foodsOnRender(); }
    const Categories = await foodsCategoriesOnRender();
    this.setInitialState(mealsRender, Categories);
    this.setKeyLocalStorage();
    if (controlFirstIf) { dispatchControlState(''); }
  }

  async componentDidUpdate() {
    const { stateMeals } = this.props;
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== '') {
      this.manageColors('others');
    } else {
      this.manageColors('all');
    }
    const MAXIMUM_LENGTH = 0;
    if (stateMeals.length > MAXIMUM_LENGTH) {
      this.stateAfterProps(stateMeals);
    }
  }

  setKeyLocalStorage() {
    const verifyLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipesInProgress = {
      cocktails: { },
      meals: { },
    };
    if (!verifyLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }

  async setCategory({ target }, { strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const filteredFoods = await filterFoodsByCategory(strCategory);
      this.setState({ Meals: filteredFoods, CategoryFilter: strCategory });
      target.style.background = '#ac5c22';
    } else {
      const initialMeals = await foodsOnRender();
      this.setState({ Meals: initialMeals, CategoryFilter: '' });
      target.style.background = '#5a2d0c';
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

  manageColors(buttons) {
    const filtros = document.getElementsByClassName('category-buttons');
    const INITIAL_VALUE = 0;
    const FINAL_VALUE = 5;
    if (buttons === 'others') {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        filtros[INITIAL_VALUE].childNodes[i].firstChild.style.background = '#5a2d0c';
        filtros[INITIAL_VALUE].childNodes[FINAL_VALUE].style.background = '#5a2d0c';
      }
    }
    if (buttons === 'all') {
      for (let i = INITIAL_VALUE; i < FINAL_VALUE; i += 1) {
        filtros[INITIAL_VALUE].childNodes[i].firstChild.style.background = '#5a2d0c';
        filtros[INITIAL_VALUE].childNodes[FINAL_VALUE].style.background = '#ac5c22';
      }
    }
  }

  stateAfterProps(props) {
    const { dispatchMeals } = this.props;
    this.setState({ Meals: props });
    dispatchMeals([]);
  }

  setInitialState(mealsRender, Categories) {
    this.setState({ Meals: mealsRender, Categories });
  }

  async allButtonHandler() {
    const initialMeals = await foodsOnRender();
    this.setState({ Meals: initialMeals, CategoryFilter: '' });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push(`/comidas/${recipe.idMeal}`);
  }

  render() {
    const INITIAL_VALUE = 0;
    const { history } = this.props;
    const { Meals, Categories } = this.state;
    return (
      <div className="food-drink-container">
        <Header history={ history } />
        <div className="category-buttons">
          {Categories ? Categories.map((element, index) => (
            <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
              <button
                className="food-filters"
                type="button"
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
              className="food-filters"
              data-testid="All-category-filter"
              onClick={ () => this.allButtonHandler() }
            >
              All
            </button>
          )}
        </div>
        <div className="cards-container">
          {Meals.length >= 1 ? Meals.map((recipe, index) => (
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <input
                type="image"
                width="100%"
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                onClick={ () => this.redirectOnImage(recipe) }
                style={ { borderRadius: '4px' } }
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` } className="bla">
                {recipe.strMeal}
              </p>
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

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchMeals: PropTypes.func.isRequired,
  stateMeals: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchControlState: PropTypes.func.isRequired,
  control: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  stateMeals: state.menu.meals,
  control: state.menu.control,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(comida(meals)),
  dispatchControlState: (control) => dispatch(controlState(control)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
