import React from 'react';
import { Link } from 'react-router-dom';

import * as cocktailAPI from '../../services/cocktailAPI';
import * as mealAPI from '../../services/mealAPI';

class RecipesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      recipes: [],
      categories: [],
      filter: '',
    };

    this.setFilter = this.setFilter.bind(this);
    this.setFilterAll = this.setFilterAll.bind(this);
  }

  async componentDidMount() {
    if (window.location.href === 'http://localhost:3000/comidas') {
      await this.setRecipesType('meals');
      const categories = await mealAPI.listCategories();
      await this.setCategories(categories.meals);
    } else if (window.location.href === 'http://localhost:3000/bebidas') {
      await this.setRecipesType('cocktails');
      const categories = await cocktailAPI.listCategories();
      await this.setCategories(categories.drinks);
    }
    this.loadRecipes();
  }

  async setCategories(categories) {
    await this.setState({ categories });
  }

  async setRecipesType(type) {
    await this.setState({ type });
  }

  async setFilter({ target }) {
    const { filter, type } = this.state;
    if (filter !== target.value) {
      await this.setState({
        filter: target.value,
        recipes: [],
      });
    } else {
      await this.setState({
        filter: '',
        recipes: [],
      });
    }

    this.loadRecipes(type);
  }

  async setFilterAll() {
    const { type } = this.state;
    await this.setState({
      filter: '',
      recipes: [],
    });
    this.loadRecipes(type);
  }

  async loadRecipes() {
    const { filter, type } = this.state;
    let recipes = {};
    if (type === 'cocktails') {
      if (filter !== '') {
        recipes = await cocktailAPI.filterByCategory(filter);
      } else {
        recipes = await cocktailAPI.searchByName('');
      }
      await this.setState({ recipes: recipes.drinks });
    } else if (type === 'meals') {
      if (filter !== '') {
        recipes = await mealAPI.filterByCategory(filter);
      } else {
        recipes = await mealAPI.searchByName('');
      }
      await this.setState({ recipes: recipes.meals });
    }
  }

  render() {
    const { recipes, type, categories } = this.state;
    const twelve = 12;
    const zero = 0;
    const five = 5;

    if (recipes.length === zero || categories.length === zero) {
      return <h2>Carregando...</h2>;
    }
    console.log(recipes);
    return (
      <div className="recipes-page">
        <div className="categories">
          <div className="category-button">
            <input
              type="button"
              data-testid="All-category-filter"
              value="All"
              onClick={ this.setFilterAll }
            />
          </div>
          {categories.map((category, index) => {
            const dataTestID = `${category.strCategory}-category-filter`;
            if (index < five) {
              if (type === 'cocktails') {
                return (
                  <div className="category-button" key={ index }>
                    <input
                      type="button"
                      data-testid={ dataTestID }
                      value={ category.strCategory }
                      onClick={ this.setFilter }
                    />
                  </div>
                );
              }
              if (type === 'meals') {
                return (
                  <div className="category-button" key={ index }>
                    <input
                      type="button"
                      data-testid={ dataTestID }
                      value={ category.strCategory }
                      onClick={ this.setFilter }
                    />
                  </div>
                );
              }
            }
            return (null);
          })}
        </div>
        <div className="recipes-section">
          {recipes.map((recipe, index) => {
            if (index < twelve) {
              const dataTestID = `${index}-recipe-card`;
              const dataTestIDImg = `${index}-card-img`;
              const dataTestIDCard = `${index}-card-name`;
              if (type === 'cocktails') {
                return (
                  <Link key={ index } to={ `/bebidas/${recipe.idDrink}` }>
                    <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                      <img
                        alt="Drink Thumb"
                        data-testid={ dataTestIDImg }
                        src={ recipe.strDrinkThumb }
                        className="recipe-thumb"
                        height="250"
                      />
                      <h2
                        className="recipe-name"
                        data-testid={ dataTestIDCard }
                      >
                        {recipe.strDrink}
                      </h2>
                    </div>
                  </Link>
                );
              }
              if (type === 'meals') {
                return (
                  <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                    <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                      <img
                        alt="Meal Thumb"
                        data-testid={ dataTestIDImg }
                        src={ recipe.strMealThumb }
                        className="recipe-thumb"
                        height="250"
                      />
                      <h2
                        className="recipe-name"
                        data-testid={ dataTestIDCard }
                      >
                        {recipe.strMeal}
                      </h2>
                    </div>
                  </Link>
                );
              }
            }
            return (null);
          })}
        </div>
      </div>
    );
  }
}

export default RecipesPage;
