import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DrinkCard from '../components/DrinkCard';
import MealCard from '../components/MealCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { DetailsContainer, IngredientsContainer,
  InstructionsContainer, TitleContainer, FooterContainer }
  from './style/Details';


class Details extends Component {
  constructor() {
    super();

    this.state = {
      details: [],
      recomendations: [],
      isLoading: true,
      isMeal: false,
      isDrink: false,
      clipboard: '',
      isFavorite: false,
      isDone: false,
      inProgress: false,
    };

    this.requestDetails = this.requestDetails.bind(this);
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.checkIsFavorite = this.checkIsFavorite.bind(this);
    this.checkInProgress = this.checkInProgress.bind(this);
    this.checkIsDone = this.checkIsDone.bind(this);
  }

  componentDidMount() {
    const { match: { path } } = this.props;
    const pathname = path;
    this.requestDetails(pathname);
  }

  handleShare() {
    const { match: { url } } = this.props;
    window.navigator.clipboard.writeText(`http://localhost:3000${url}`)
      .then(() => {
        this.setState({
          clipboard: `http://localhost:3000${url}`,
        });
      });
  }

  handleFavorite() {
    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }), () => {
      const { isFavorite } = this.state;
      if (isFavorite) this.saveToLocalStorage();
      else this.deleteFromLocalStorage();
    });
  }

  checkIsFavorite() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (LS && LS.find((recipe) => recipe.id === details[0].idMeal
      || recipe.id === details[0].idDrink)) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  checkIsDone() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (LS && LS.find((recipe) => recipe.id === details[0].idMeal
      || recipe.id === details[0].idDrink)) {
      this.setState({
        isDone: true,
      });
    }
  }

  checkInProgress() {
    const { details, isDrink, isMeal } = this.state;
    const LSP = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (LSP !== null) {
      const checkIdMeal = (isMeal && LSP.meals[details[0].idMeal]);
      const checkIdDrink = (isDrink && LSP.cocktails[details[0].idDrink]);

      if (checkIdMeal || checkIdDrink) {
        return this.setState({
          inProgress: true,
        });
      }

      return this.setState({
        inProgress: false,
      });
    }
  }

  saveToLocalStorage() {
    const { isMeal, details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
    }
    if (!LS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...LS, obj]));
    }
  }

  deleteFromLocalStorage() {
    const { details } = this.state;
    const LS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredLS = LS.filter((recipe) => !recipe.id
      .includes(details[0].idMeal || details[0].idDrink));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredLS));
  }

  requestDetails(pathname) {
    this.setState(() => {
      if (pathname.includes('comidas')) {
        return { isLoading: true, isMeal: true };
      }
      return { isLoading: true, isDrink: true };
    }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const { isMeal, isDrink } = this.state;
      let endPointMeal;
      let endPointDrink;
      if (isMeal) {
        endPointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        endPointDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        endPointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const mealsApi = await fetch(endPointMeal);
      const { meals } = await mealsApi.json();
      const drinksApi = await fetch(endPointDrink);
      const { drinks } = await drinksApi.json();
      const zero = 0;
      const six = 6;
      if (isDrink) {
        this.setState({
          details: drinks,
          recomendations: meals.slice(zero, six),
          isLoading: false,
        }, () => {
          this.checkIsFavorite();
          this.checkIsDone();
          this.checkInProgress();
        });
      } else {
        this.setState({
          details: meals,
          recomendations: drinks.slice(zero, six),
          isLoading: false,
        }, () => {
          this.checkIsFavorite();
          this.checkIsDone();
          this.checkInProgress();
        });
      }
    });
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
    const { match: { url }, history } = this.props;
    const { details,
      recomendations,
      isMeal,
      clipboard,
      isFavorite,
      isDone,
      inProgress,
    } = this.state;
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
      strYoutube,
    } = details[0];

    return (
        <div>
          <TitleContainer>
            <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
          </TitleContainer>
      <DetailsContainer>
        <div className="recipe-container">
          <img
              className="recipe-photo"
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
          <div className="buttons-recipe">
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
            <button type="button" data-testid="share-btn" onClick={ this.handleShare }>
              <img src={ shareIcon } alt="Share Recipe" />
            </button>
          </div>
        </div>
        <IngredientsContainer>
          {ingredientsAndMeasures.map((item, idx) => (
              <li key={ `${idx}` } data-testid={ `${idx}-ingredient-name-and-measure` }>
                {item}
              </li>
          ))}
        </IngredientsContainer>
        <InstructionsContainer>
          <p data-testid="instructions">{strInstructions}</p>
        </InstructionsContainer>
      </DetailsContainer>
      <FooterContainer>
        {!isDone && (
            <button
                className="start"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`${url}/in-progress`) }
            >
              { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>
        )}
      </FooterContainer>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>{isLoading ? <p>carregando</p> : this.renderCardDetails()}</div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default Details;
