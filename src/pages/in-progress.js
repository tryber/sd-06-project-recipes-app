import React, { Component } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import './style/details.css';

const getFromLS = (id, pathname) => {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const path = pathname.includes('comidas') ? 'meals' : 'cocktails';
  if (!LS) return {};
  return LS[path][id].reduce((acc, currV) => ({ ...acc, [currV]: true }), {});
};

class InProgress extends Component {
  constructor({ match: { params: { id }, path } }) {
    super();

    this.state = {
      details: [],
      isLoading: true,
      isMeal: false,
      isDrink: false,
      clipboard: '',
      isFavorite: false,
      isDone: false,
      ingredientsUsed: [],
      inputsMarked: getFromLS(id, path),
    };

    this.requestDetails = this.requestDetails.bind(this);
    this.checkRecipeProgress = this.checkRecipeProgress.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.checkIsFavorite = this.checkIsFavorite.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setInputMarked = this.setInputMarked.bind(this);
    this.saveInProgressToLS = this.saveInProgressToLS.bind(this);
  }

  componentDidMount() {
    const {
      match: { path },
    } = this.props;
    const pathname = path;
    this.requestDetails(pathname);
  }

  handleShare() {
    const {
      match: { url },
    } = this.props;
    window.navigator.clipboard
      .writeText(`http://localhost:3000${url.replace('/in-progress', '')}`)
      .then(() => {
        this.setState({
          clipboard: `http://localhost:3000${url.replace('/in-progress', '')}`,
        });
      });
  }

  handleFavorite() {
    this.setState(
      (prevState) => ({
        isFavorite: !prevState.isFavorite,
      }),
      () => {
        const { isFavorite } = this.state;
        if (isFavorite) this.saveToLocalStorage('favoriteRecipes');
        else this.deleteFromLocalStorage('favoriteRecipes');
      },
    );
  }

  handleInput({ target: { name, value, checked } }) {
    if (checked) {
      this.setState(
        (prev) => ({
          ingredientsUsed: [...prev.ingredientsUsed, value],
          inputsMarked: {
            ...prev.inputsMarked,
            [name]: !prev.inputsMarked[name],
          },
        }),
        () => {
          this.saveInProgressToLS();
          this.checkIsDone();
        },
      );
    } else {
      this.setState(
        (prev) => ({
          ingredientsUsed: prev.ingredientsUsed.filter((ing) => ing !== value),
          inputsMarked: {
            ...prev.inputsMarked,
            [name]: !prev.inputsMarked[name],
          },
        }),
        () => {
          this.saveInProgressToLS();
          this.checkIsDone();
        },
      );
    }
  }

  setInputMarked() {
    const { ingredientsUsed, details } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);
    ingredientsAndMeasures.forEach((i) => {
      this.setState((prev) => ({
        inputsMarked: {
          ...prev.inputsMarked,
          [i]: ingredientsUsed.includes(i),
        },
      }));
    });
  }

  checkIsFavorite() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (LS
      && LS.find(
        (recipe) => recipe.id === details[0].idMeal || recipe.id === details[0].idDrink,
      )
    ) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  checkIsDone() {
    const { details, ingredientsUsed } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);
    const ingredientsLength = ingredientsAndMeasures.length;
    if (ingredientsUsed.length === ingredientsLength) {
      this.setState(
        { isDone: true },
        () => this.saveToLocalStorage('doneRecipes'),
      );
    } else {
      this.setState(
        { isDone: false },
        () => {
          const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
          if (recipesDone) {
            this.deleteFromLocalStorage('doneRecipes');
          }
        },
      );
    }
  }

  saveInProgressToLS() {
    const { ingredientsUsed, isMeal } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    let LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!LS) {
      LS = {
        cocktails: {},
        meals: {},
      };
    }
    let obj;
    if (isMeal) {
      obj = {
        ...LS,
        meals: {
          ...LS.meals,
          [id]: ingredientsUsed,
        },
      };
    } else {
      obj = {
        ...LS,
        cocktails: {
          ...LS.cocktails,
          [id]: ingredientsUsed,
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }

  saveToLocalStorage(storageKeyName) {
    const { isMeal, details } = this.state;
    const LS = JSON.parse(localStorage.getItem(storageKeyName));
    let obj;
    if (isMeal) {
      obj = {
        id: details[0].idMeal,
        type: 'comida',
        area: details[0].strArea,
        category: details[0].strCategory,
        alcoholicOrNot: '',
        name: details[0].strMeal,
        image: details[0].strMealThumb,
      };

      if (storageKeyName === 'doneRecipes') {
        obj = {
          ...obj,
          tags: details[0].strTags && details[0].strTags.split(','),
          doneDate: details[0].dateModified,
        };
      }
    } else {
      obj = {
        id: details[0].idDrink,
        type: 'bebida',
        area: '',
        category: details[0].strCategory,
        alcoholicOrNot: details[0].strAlcoholic,
        name: details[0].strDrink,
        image: details[0].strDrinkThumb,
      };
      if (storageKeyName === 'doneRecipes') {
        obj = {
          ...obj,
          tags: details[0].strTags && details[0].strTags.split(','),
          doneDate: details[0].dateModified,
        };
      }
    }
    if (!LS) {
      localStorage.setItem(storageKeyName, JSON.stringify([obj]));
    } else {
      localStorage.setItem(storageKeyName, JSON.stringify([...LS, obj]));
    }
  }

  deleteFromLocalStorage(storageKeyName) {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem(storageKeyName));
    const filteredLS = LS.filter(
      (recipe) => !recipe.id.includes(details[0].idMeal || details[0].idDrink),
    );
    localStorage.setItem(storageKeyName, JSON.stringify(filteredLS));
  }

  requestDetails(pathname) {
    this.setState(
      () => {
        if (pathname.includes('comidas')) {
          return { isLoading: true, isMeal: true };
        }
        return { isLoading: true, isDrink: true };
      },
      async () => {
        const {
          match: {
            params: { id },
          },
        } = this.props;
        const { isMeal } = this.state;

        if (isMeal) {
          const endPointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
          const mealsApi = await fetch(endPointMeal);
          const { meals } = await mealsApi.json();
          this.setState(
            {
              details: meals,
              isLoading: false,
            },
            () => {
              this.checkIsFavorite();
              this.checkIsDone();
              this.checkRecipeProgress();
            },
          );
        } else {
          const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
          const drinksApi = await fetch(endPointDrink);
          const { drinks } = await drinksApi.json();
          this.setState(
            {
              details: drinks,
              isLoading: false,
            },
            () => {
              this.checkIsFavorite();
              this.checkIsDone();
              this.checkRecipeProgress();
            },
          );
        }
      },
    );
  }

  checkRecipeProgress() {
    const { isMeal, isDrink } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (LS && isMeal) {
      if (Object.keys(LS.meals).find((mealId) => mealId === id)) {
        this.setState({
          ingredientsUsed: LS.meals[id],
        }, () => this.setInputMarked());
      }
    } else if (LS && isDrink) {
      if (Object.keys(LS.cocktails).find((cocktailId) => cocktailId === id)) {
        this.setState(
          {
            ingredientsUsed: LS.cocktails[id],
          },
          () => this.setInputMarked(),
        );
      }
    } else {
      const { details } = this.state;
      const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);
      ingredientsAndMeasures.forEach((i) => {
        this.setState((prev) => ({
          inputsMarked: {
            ...prev.inputsMarked,
            [i]: false,
          },
        }));
      });
    }
  }

  parseIngredientsAndMeasures(details) {
    const ZERO = 0;
    let index = ZERO;
    const ingredients = Object.entries(details[0])
      .filter(([key, value]) => {
        if (key === `strIngredient${index + 1}` && value !== ' ') {
          index += 1;
          return value;
        }
        return null;
      })
      .map((item) => item[1]);

    index = ZERO;
    const measures = Object.entries(details[0])
      .filter(([key, value]) => {
        if (key === `strMeasure${index + 1}` && value !== ' ') {
          index += 1;
          return value;
        }
        return null;
      })
      .map((item) => item[1]);

    return ingredients.map((ingredient, idx) => `${ingredient} - ${measures[idx]}`);
  }

  renderCardDetails() {
    const { history } = this.props;
    const { details, isMeal, clipboard, isFavorite, isDone, inputsMarked } = this.state;
    const ingredientsAndMeasures = this.parseIngredientsAndMeasures(details);

    const zero = 0;
    const {
      strMeal,
      strMealThumb,
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
      strInstructions,
    } = details[0];

    return (
      <div>
        <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt={ `${strMeal || strDrink}` }
          width={ 100 }
        />
        {clipboard.length !== zero && (
          <div>
            <p>Link copiado!</p>
          </div>
        )}
        <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <button type="button" onClick={ this.handleFavorite }>
          {isFavorite ? (
            <img
              src={ blackHeartIcon }
              data-testid="favorite-btn"
              alt="Favorite Recipe"
            />
          ) : (
            <img
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              alt="Favorite Recipe"
            />
          )}
        </button>
        {isMeal ? (
          <p data-testid="recipe-category">{strCategory}</p>
        ) : (
          <p data-testid="recipe-category">{strAlcoholic}</p>
        )}
        {ingredientsAndMeasures.map((item, idx) => (
          <div key={ `${idx}` } data-testid={ `${idx}-ingredient-step` }>
            <input
              name={ item }
              type="checkbox"
              checked={ inputsMarked[item] }
              onChange={ (e) => this.handleInput(e) }
              value={ item }
            />
            {item}
          </div>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
          disabled={ !isDone }
          onClick={ () => history.push('/receitas-feitas') }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? <p>carregando</p> : this.renderCardDetails()}</div>;
  }
}

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default InProgress;
