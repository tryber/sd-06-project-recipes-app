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

class RecipesCardDrinks extends Component {
  constructor() {
    super();

    this.saveArrayToState = this.saveArrayToState.bind(this);
    this.requestFromApi = this.requestFromApi.bind(this);

    this.state = {
      drinksState: [],
      selectedFilter: 'All',
    };
  }

  componentDidUpdate(prevProps) {
    const { drinks } = this.props;
    if (prevProps.drinks !== drinks) {
      this.saveArrayToState(drinks);
    }
  }

  saveArrayToState(drinks) {
    this.setState({ drinksState: drinks });
  }

  async requestFromApi({ target: { id } }) {
    const { drinks: drinksProps } = this.props;
    const { selectedFilter } = this.state;
    const buttonsElements = document.querySelectorAll('button');
    buttonsElements.forEach((item) => item.classList.remove('selected'));

    if (id !== 'All' && id !== selectedFilter) {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
      const drinksApi = await fetch(endPoint);
      const { drinks } = await drinksApi.json();

      return this.setState({
        drinksState: drinks,
        selectedFilter: id,
      });
    }

    return this.setState({
      drinksState: drinksProps,
      selectedFilter: 'All',
    });
  }

  filter(index, strCategory) {
    const nameButton = strCategory.split('/');
    return (
      <FilterButtons key={ index }>
        <button
          id={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ this.requestFromApi }
        >
          {nameButton[0]}
        </button>
      </FilterButtons>
    );
  }

  renderDrinks(drinks) {
    const zero = 0;
    const twelve = 12;
    const drinksArray = drinks.slice(zero, twelve);

    return drinksArray.map((item, index) => {
      const { strDrinkThumb, strDrink, idDrink } = item;
      return (
        <div key={ index }>
          <Link data-testid={ `${index}-recipe-card` } to={ `/bebidas/${idDrink}` }>
            <img
              className="recipe-thumb"
              data-testid={ `${index}-card-img` }
              alt={ strDrink }
              src={ strDrinkThumb }
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </Link>
        </div>
      );
    });
  }

  renderFilterButtons(drinksCategories) {
    const zero = 0;
    const five = 5;

    const drinksCategoriesArray = drinksCategories.slice(zero, five);
    drinksCategoriesArray.push({ strCategory: 'All' });
    return drinksCategoriesArray.map((item, index) => {
      const { strCategory } = item;
      return this.filter(index, strCategory);
    });
  }

  render() {
    const { drinksCategories } = this.props;
    const { drinksState } = this.state;
    return (
      <MealsAndDrinksContainer>
        <ButtonContainer>
          { drinksCategories && this.renderFilterButtons(drinksCategories) }
        </ButtonContainer>
        <MainContainer>
          { drinksState && this.renderDrinks(drinksState) }
        </MainContainer>
      </MealsAndDrinksContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.mealsAndDrinksReducer.drinks,
  drinksCategories: state.mealsAndDrinksReducer.drinksCategories,
});

RecipesCardDrinks.propTypes = {
  drinks: PropTypes.objectOf.isRequired,
  drinksCategories: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(RecipesCardDrinks);
