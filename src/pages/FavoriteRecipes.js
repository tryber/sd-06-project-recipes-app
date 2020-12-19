import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, FavFoodCard, FavDrinkCard } from '../components';


class FavoriteRecipes extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'all',
      drinkIndex: 0,
    };

    this.setFilterState = this.setFilterState.bind(this);
    this.setFilterIndex = this.setFilterIndex.bind(this);
    this.changeH1Width = this.changeH1Width.bind(this);
  }

  componentDidMount() {
    this.changeH1Width();
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      const foods = recipes.filter((element) => element.type === 'comida').length;
      this.setFilterIndex(foods);
    }
  }

  setFilterIndex(foods) {
    this.setState({
      drinkIndex: foods,
    });
  }

  setFilterState({ target }) {
    const all = document.getElementById('all');
    const food = document.getElementById('food');
    const drink = document.getElementById('drink');
    if (target.id === 'food') {
      target.className = 'food-filters-checked';
      drink.className = 'food-filters';
      all.className = 'food-filters';
    } else if (target.id === 'drink') {
      target.className = 'food-filters-checked';
      food.className = 'food-filters';
      all.className = 'food-filters';
    } else {
      target.className = 'food-filters-checked';
      drink.className = 'food-filters';
      food.className = 'food-filters';
    }
    this.setState({
      type: target.id,
    });
  }

  changeH1Width() {
    const h1 = document.querySelector('.global-h1');
    const profileDiv = document.querySelector('.profile-icon-div');
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      h1.style.fontSize = '26px';
      profileDiv.style.width = '80px';
      const searchInputDiv = document.querySelector('.search-input-div');
      searchInputDiv.style.width = '60px';
    }
  }

  render() {
    const { history } = this.props;
    const { type, drinkIndex } = this.state;
    return (
      <div className="done-recipes-container">
        <Header history={ history } />
        <div className="category-buttons buttons-done">
          <button
            id="all"
            data-testid="filter-by-all-btn"
            type="button"
            className="food-filters-checked"
            onClick={ this.setFilterState }
          >
            All
          </button>

          <button
            id="food"
            data-testid="filter-by-food-btn"
            type="button"
            className="food-filters"
            onClick={ this.setFilterState }
          >
            Food
          </button>

          <button
            id="drink"
            data-testid="filter-by-drink-btn"
            type="button"
            className="food-filters"
            onClick={ this.setFilterState }
          >
            Drinks
          </button>
        </div>
        {type === 'food' ? <FavFoodCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'drink' ? <FavDrinkCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'all'
          ? (
            <div className="food-or-drink-done-card">
              <FavFoodCard history={ history } indexAcc={ 0 } />
              <FavDrinkCard history={ history } indexAcc={ drinkIndex } />
            </div>)
          : null }

      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(FavoriteRecipes);
