import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  MealsAndDrinksContainer,
  MainContainer,
  ButtonContainer,
  FilterButtons,
} from './style/mealsAndDrinks';

class RecipesCardMeals extends Component {
  constructor() {
    super();

    this.saveArrayToState = this.saveArrayToState.bind(this);
    this.requestFromApi = this.requestFromApi.bind(this);

    this.state = {
      mealsState: [],
      selectedFilter: 'All',
    };
  }

  componentDidUpdate(prevProps) {
    const { meals } = this.props;
    if (prevProps.meals !== meals) {
      this.saveArrayToState(meals);
    }
  }

  saveArrayToState(meals) {
    this.setState({ mealsState: meals });
  }

  async requestFromApi({ target: { id } }) {
    const { meals: mealsProps } = this.props;
    const { selectedFilter } = this.state;
    const buttonsElements = document.querySelectorAll('button');
    buttonsElements.forEach((item) => item.classList.remove('selected'));

    if (id !== 'All' && id !== selectedFilter) {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
      const mealsApi = await fetch(endPoint);
      const { meals } = await mealsApi.json();
      document.getElementById(id).classList.add('selected');

      return this.setState({
        mealsState: meals,
        selectedFilter: id,
      });
    }

    return this.setState({
      mealsState: mealsProps,
      selectedFilter: 'All',
    });
  }

  filter(index, strCategory) {
    return (
      <FilterButtons key={ index }>
        <button
          id={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ this.requestFromApi }
        >
          {strCategory}
        </button>
      </FilterButtons>
    );
  }

  renderMeals(meals) {
    const zero = 0;
    const twelve = 12;
    const mealsArray = meals.slice(zero, twelve);

    return mealsArray.map((item, index) => {
      const { strMealThumb, strMeal, idMeal } = item;
      return (
        <div key={ index }>
          <Link data-testid={ `${index}-recipe-card` } to={ `/comidas/${idMeal}` }>
            <img
              className="recipe-thumb"
              data-testid={ `${index}-card-img` }
              alt={ strMeal }
              src={ strMealThumb }
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </Link>
        </div>
      );
    });
  }

  renderFilterButtons(mealsCategories) {
    const zero = 0;
    const five = 5;

    const mealsCategoriesArray = mealsCategories.slice(zero, five);
    mealsCategoriesArray.push({ strCategory: 'All' });
    return mealsCategoriesArray.map((item, index) => {
      const { strCategory } = item;
      return this.filter(index, strCategory);
    });
  }

  render() {
    const { mealsCategories } = this.props;
    const { mealsState } = this.state;
    return (
      <MealsAndDrinksContainer>
        <ButtonContainer>
          { mealsCategories && this.renderFilterButtons(mealsCategories) }
        </ButtonContainer>
        <MainContainer>
          { mealsState && this.renderMeals(mealsState) }
        </MainContainer>
      </MealsAndDrinksContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.mealsAndDrinksReducer.meals,
  mealsCategories: state.mealsAndDrinksReducer.mealsCategories,
});

RecipesCardMeals.propTypes = {
  meals: PropTypes.objectOf.isRequired,
  mealsCategories: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCardMeals);
