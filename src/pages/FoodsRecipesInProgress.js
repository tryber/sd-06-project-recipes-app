import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealsById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodsRecipesInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      Meal: [],
      Ingredients: [],
      Measures: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.setMealState = this.setMealState.bind(this);
  }

  async componentDidMount() {
    const { idCurrent } = this.props;
    console.log(idCurrent);
    const mealRecipe = await fetchMealsById(Number(idCurrent));
    console.log(mealRecipe);
    this.setMealState(mealRecipe);
    this.handleIngredients();
  }

  handleClick() {
    const { history } = this.props;
    history.push('/receitas-feitas');
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

  setMealState(Meal) {
    this.setState({
      Meal,
    });
  }

  setIngredients(Ingredients, Measures) {
    this.setState({
      Ingredients,
      Measures,
    });
  }

  render() {
    const { Meal, Ingredients, Measures } = this.state;
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
              {Ingredients.map((recipes, i) => (
                <div key={ index }>
                  <label
                    className="detail-ingredients"
                    htmlFor="ingredient"
                  >
                    <input
                      id="ingredient"
                      type="checkbox"
                      data-testid={ `${index}-ingredient-step` }
                    />
                    {recipes}
                    -
                    { Measures[i] }
                  </label>
                </div>
              ))}
            </div>
            <h2 data-testid="instructions">Instructions</h2>
            <div className="detail-instructions">{recipe.strInstructions}</div>
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            <div>
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => this.handleClick() }
              >
                Finalizar Receita
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

FoodsRecipesInProgress.propTypes = {
  idCurrent: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(FoodsRecipesInProgress);
