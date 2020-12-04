import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Header, Footer } from '../components';

import getMeals from '../services/theMealApi';

class ExploreByArea extends Component {
  constructor() {
    super();

    this.state = {
      meals: [],
      filterArea: ['All'],
      selectedArea: 'All',
    };

    this.updateAreaToState = this.updateAreaToState.bind(this);
    this.getMeals = this.getMeals.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
  }

  componentDidMount() {
    this.getMeals();
    this.updateAreaToState();
  }

  handleOptions({ target: { value } }) {
    this.setState({
      selectedArea: value,
    }, () => this.requestFromApi());
  }

  async getMeals() {
    const { meals } = await getMeals('search.php?s=');
    this.setState({
      meals,
    });
  }

  async updateAreaToState() {
    const { meals } = await getMeals('list.php?a=list');
    const areas = meals.map((meal) => meal.strArea);
    this.setState((prev) => ({
      filterArea: prev.filterArea.concat(areas),
    }));
  }

  async requestFromApi() {
    const { selectedArea } = this.state;

    if (selectedArea !== 'All') {
      const { meals } = await getMeals(`filter.php?a=${selectedArea}`);

      return this.setState({
        meals,
      });
    }
    const { meals } = await getMeals('search.php?s=');
    return this.setState({
      meals,
    });
  }

  renderDropdown() {
    const { filterArea } = this.state;
    return (
      <select
        data-testid="explore-by-area-dropdown"
        name="selectedArea"
        onChange={ (e) => this.handleOptions(e) }
      >
        {/* <option value="All" data-testid={`All-option`}>All</option> */}
        {filterArea && filterArea.map((area) => (
          <option
            key={ area }
            value={ area }
            data-testid={ `${area}-option` }
          >
            {area}
          </option>
        ))}

      </select>
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

  render() {
    const { meals } = this.state;
    return (
      <div>
        <Header title="Explorar Origem" />
        {this.renderDropdown()}
        {this.renderMeals(meals)}
        <Footer />
      </div>
    );
  }
}

export default ExploreByArea;
