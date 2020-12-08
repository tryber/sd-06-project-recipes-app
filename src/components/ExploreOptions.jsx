import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import randomCall from '../services/theRandomCallApi';

import ButtonsContainer  from './style/Explore';

class ExploreOptions extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const eigth = 8;
    const { location: { pathname }, history } = this.props;
    const path = pathname;
    const randomFood = ('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomDrink = ('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    if (path === '/explorar/comidas') {
      const randomAPI = await randomCall(randomFood);
      const foodID = randomAPI.meals[0].idMeal;
      history.push(`${path.slice(-eigth)}/${foodID}`);
    }
    if (path === '/explorar/bebidas') {
      const randomAPI = await randomCall(randomDrink);
      const drinkID = randomAPI.drinks[0].idDrink;
      history.push(`${path.slice(-eigth)}/${drinkID}`);
    }
  }

  render() {
    const { location: { pathname } } = this.props;
    const path = pathname;

    return (
      <ButtonsContainer>
        <Link data-testid="explore-by-ingredient" to={ `${pathname}/ingredientes` }>
          Por Ingredientes
        </Link>
        {!path.includes('bebidas') && (
          <Link data-testid="explore-by-area" to={ `${pathname}/area` }>
            Por Local de Origem
          </Link>
        )}
        <button
          type="button"
          onClick={ () => this.handleClick() }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </ButtonsContainer>
    );
  }
}

ExploreOptions.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default ExploreOptions;

