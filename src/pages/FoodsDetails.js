import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealsById, fetchRecommendedDrinks } from '../services';
import { currentID } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      Meal: [],
      RecommendedDrinks: [],
      x: 0,
      Ingredients: [],
      Measures: [],
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.redirectFromState = this.redirectFromState.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } }, ID } = this.props;
    const endpoint = pathname.split('/').pop();
    ID(endpoint);
    const mealRecipe = await fetchMealsById(endpoint);
    const recommendedDrinks = await fetchRecommendedDrinks();
    this.setMealState(mealRecipe, recommendedDrinks);
    this.handleIngredients();
  }

  handleIngredients() {
    const ingredientArray = [];
    const measureArray = [];
    let ingredient;
    let measure;
    const { Meal } = this.state;
    Meal.map((recipe) => {
      const twenty = 20;
      for (let index = 1; index <= twenty; index += 1) {
        ingredient = `strIngredient${index}`;
        measure = `strMeasure${index}`;
        ingredientArray.push(recipe[ingredient]);
        measureArray.push(recipe[measure]);
      }
      const filteredIngredients = ingredientArray.filter((item) => item !== '')
        .filter((element) => element !== 'null');

      const filteredMeasure = measureArray.filter((item) => item !== '')
        .filter((element) => element !== 'null');

      this.setIngredients(filteredIngredients, filteredMeasure);
      return null;
    });
  }

  setMealState(Meal, RecommendedDrinks) {
    this.setState({
      Meal,
      RecommendedDrinks,
    });
  }

  setIngredients(Ingredients, Measures) {
    this.setState({
      Ingredients,
      Measures,
    });
  }

  goLeft() {
    const additionalX = 110;
    const mintranslateX = 0;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === mintranslateX) this.setState({ x: x - maxtranslateX });
    else this.setState({ x: x + additionalX });
  }

  goRight() {
    const additionalX = 110;
    const maxtranslateX = 440;
    const { x } = this.state;
    if (x === -maxtranslateX) this.setState({ x: x + maxtranslateX });
    else this.setState({ x: x - additionalX });
  }

  redirectFromState() {
    const { idCurrent } = this.props;
    const { history } = this.props;
    // if (meals !== null && meals.length === 1) {
    //   history.push(`/comidas/${meals[0].idMeal}`);
    // }
    // if (drinks !== null && drinks.length === 1) {
    history.push(`/comidas/${idCurrent}/in-progress`);
  }

  render() {
    const { Meal, RecommendedDrinks, x, Ingredients, Measures } = this.state;
    // const { history } = this.props;
    return (
      <div className="food-drink-detail-container">
        {Meal ? Meal.map((recipe, index) => (
          <div className="detail-card" key={ index }>
            <img
              src={ recipe.strMealThumb }
              data-testid="recipe-photo"
              alt="recipe-img"
            />
            <div className="details-title-div">
              <div className="recipe-title">
                <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
                <p data-testid="recipe-category">{recipe.strCategory}</p>
              </div>
              <div className="recipe-buttons">
                <input
                  type="image"
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="shareIcon"
                />
                <input
                  type="image"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="whiteHeartIcon"
                />
              </div>
            </div>
            <hr className="card-hr" />
            <h2>Ingredients</h2>
            <div className="ingredients">
              <ul className="detail-ingredients">
                {Ingredients.map((recipes, i) => (
                  <li
                    key={ index }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {recipes}
                    -
                    { Measures[i] }
                  </li>
                ))}
              </ul>
            </div>
            <h2 data-testid="instructions">Instructions</h2>
            <div className="detail-instructions">{recipe.strInstructions}</div>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <h2>Recomendadas</h2>
            <div className="slider">
              {RecommendedDrinks.map((recomend, i) => (
                <div
                  key={ i }
                  className="slide"
                  style={ { transform: `translateX(${x}%)` } }
                >
                  <img
                    src={ recomend.strDrinkThumb }
                    data-testid="recipe-photo"
                    alt="recipe-img"
                  />
                  <div className="text-slider-div">
                    <p>{recomend.strAlcoholic}</p>
                    <h4>{recomend.strDrink}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button type="button" id="goLeft" onClick={ this.goLeft }>
                <i className="fas fa-chevron-left" />
              </button>
              <button type="button" id="goRight" onClick={ this.goRight }>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
            <div>
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ this.redirectFromState }
              >
                Iniciar Receita
              </button>
            </div>
          </div>
        )) : null }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  idCurrent: state.menu.currentID,
});

const mapDispatchToProps = (dispatch) => ({
  ID: (endpoint) => dispatch(currentID(endpoint)),
});

FoodsDetails.propTypes = {
  history: PropTypes.shape().isRequired,
  ID: PropTypes.string.isRequired,
  idCurrent: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsDetails);
