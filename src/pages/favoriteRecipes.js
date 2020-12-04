import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { Header } from '../components';

import './style/recipesDone.css';

class FavoriteRecipes extends Component {
  constructor() {
    super();

    this.handleFilterButton = this.handleFilterButton.bind(this);
    this.saveRecipesToState = this.saveRecipesToState.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.deleteFromLocalStorage = this.deleteFromLocalStorage.bind(this);

    this.state = {
      filterButton: 'All',
      favRecipes: [],
      clipboard: '',
    };
  }

  componentDidMount() {
    this.saveRecipesToState();
  }

  handleShare(type, id) {
    const path = `${type}s/${id}`;
    window.navigator.clipboard
      .writeText(`http://localhost:3000/${path}`)
      .then(() => {
        this.setState({
          clipboard: { [id]: `http://localhost:3000/${path}` },
        });
      });
  }

  handleFilterButton({ target: { name } }) {
    if (name === 'Food') {
      name = 'comida';
    }
    if (name === 'Drinks') {
      name = 'bebida';
    }
    this.setState({ filterButton: name });
  }

  filterRecipes() {
    const { filterButton, favRecipes } = this.state;

    if (filterButton === 'All') {
      return favRecipes;
    }
    return favRecipes.filter((item) => item.type === filterButton);
  }

  saveRecipesToState() {
    const recipesFromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipesFromLS) {
      this.setState((previous) => ({
        favRecipes: previous.favRecipes.concat(recipesFromLS),
      }));
    }
  }

  deleteFromLocalStorage(id) {
    const { favRecipes } = this.state;
    const filteredLS = favRecipes.filter((recipe) => !recipe.id.includes(id));
    this.setState({ favRecipes: filteredLS });
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredLS));
  }

  renderRecipes() {
    const { clipboard } = this.state;

    return this.filterRecipes().map((item, index) => {
      const { id, name, image, category, area, tags, doneDate, type } = item;
      const mealCategory = `${area} - ${category}`;
      const zero = 0;
      const two = 2;

      return (
        <div key={ index }>
          <Link to={ `/${type}s/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              className="done-thumb"
              src={ image }
              alt="recipe"
            />
          </Link>
          {type === 'bebida'
            ? <p data-testid={ `${index}-horizontal-top-text` }>Alcoholic</p>
            : <p data-testid={ `${index}-horizontal-top-text` }>{ mealCategory }</p>}
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          {doneDate && (
            <div>
              <span>Feita em:</span>
              <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
            </div>
          )}
          {clipboard[id] !== undefined && (
            <div>
              <p>Link copiado!</p>
            </div>
          )}
          <button name={ id } type="button" onClick={ () => this.handleShare(type, id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share Recipe"
            />
          </button>
          <button type="button" onClick={ () => this.deleteFromLocalStorage(id) }>
            <img
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="Favorite Recipe"
            />
          </button>
          { tags && tags.slice(zero, two).map((tag, index2) => (
            <span key={ index2 } data-testid={ `${zero}-${tag}-horizontal-tag` }>
              { tag }
            </span>
          ))}
        </div>
      );
    });
  }

  renderFilterButtons() {
    return (
      <div>
        <button
          name="All"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ this.handleFilterButton }
        >
          All
        </button>
        <button
          name="Food"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ this.handleFilterButton }
        >
          Food
        </button>
        <button
          name="Drinks"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ this.handleFilterButton }
        >
          Drinks
        </button>
      </div>
    );
  }

  render() {
    const { favRecipes } = this.state;
    return (
      <div>
        <Header title="Receitas Favoritas" noSearchBar />
        { this.renderFilterButtons() }
        { favRecipes && this.renderRecipes() }
      </div>
    );
  }
}

export default FavoriteRecipes;
