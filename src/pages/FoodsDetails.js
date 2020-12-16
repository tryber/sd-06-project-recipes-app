import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import { fetchMealsById, fetchRecommendedDrinks } from '../services';
import { currentID, favRecipe } from '../actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      Meal: [],
      RecommendedDrinks: [],
      x: 0,
      Ingredients: [],
      Measures: [],
      Video: '',
      Update: false,
    };
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
    this.handleYoutubeVideo = this.handleYoutubeVideo.bind(this);
    this.redirectFromState = this.redirectFromState.bind(this);
    this.checkRecipesDone = this.checkRecipesDone.bind(this);
    this.handleShareFood = this.handleShareFood.bind(this);
    this.setMealState = this.setMealState.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } }, dispatchID } = this.props;
    const endpoint = pathname.split('/').pop();
    dispatchID(endpoint);
    const mealRecipe = await fetchMealsById(endpoint);
    const recommendedDrinks = await fetchRecommendedDrinks();
    this.setMealState(mealRecipe, recommendedDrinks);
    this.handleIngredients();
    this.changeButtonInnerText();
  }

  handleYoutubeVideo(url) {
    const Video = url.split('=')[1];
    this.setState({ Video });
  }

  async handleShareFood({ target }, { idMeal }) {
    const twoo = 2;
    if ((target.parentNode).childNodes.length <= twoo) {
      const { parentNode } = target;
      const paragraph = document.createElement('p');
      paragraph.innerText = 'Link copiado!';
      paragraph.style.fontSize = '8px';
      paragraph.style.fontWeight = '100';
      parentNode.appendChild(paragraph);
    }
    const url = `http://localhost:3000/comidas/${idMeal}`;
    await copy(url);
  }

  handleIngredients() {
    const ingredientArray = [];
    const measureArray = [];
    let ingredient;
    let measure;
    const { Meal } = this.state;
    const recipe = Meal[0];

    this.handleYoutubeVideo(recipe.strYoutube);
    const twenty = 20;
    for (let index = 1; index <= twenty; index += 1) {
      ingredient = `strIngredient${index}`;
      measure = `strMeasure${index}`;
      ingredientArray.push(recipe[ingredient]);
      measureArray.push(recipe[measure]);
    }
    const filteredIngredients = ingredientArray.filter((item) => item !== undefined)
      .filter((element) => element !== null).filter((element) => element !== '');

    const filteredMeasure = measureArray.filter((item) => item !== undefined)
      .filter((element) => element !== null).filter((element) => element !== '');

    this.setIngredients(filteredIngredients, filteredMeasure);
    return null;
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

  setLocalState(recipe) {
    const myObject = [{
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }];
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(myObject));
    }
    const myLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const shareButton = document.querySelector('.fav-button');
    const blackHeart = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
    const zero = 0;
    const minusOne = -1;
    if (shareButton.src === blackHeart && myLocalStorage) {
      const itemToRemove = myLocalStorage
        .find((element) => (element.id === recipe.idMeal));
      const indexToRemove = myLocalStorage.indexOf(itemToRemove, zero);
      if (indexToRemove !== minusOne) {
        myLocalStorage.splice(indexToRemove, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(myLocalStorage));
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(myLocalStorage)); // assim remove
    } else {
      const MyLSObj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const combineObjects = MyLSObj.concat(myObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(combineObjects)); // assim add
    }
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredStorage = favRecipes
      .filter((v, i, a) => a.findIndex((t) => (t.id === v.id)) === i); // só registra um único id
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredStorage));
    const { Update } = this.state;
    this.setState({ Update: !Update });
  }

  changeButtonInnerText() {
    const { idCurrent } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localStorage.inProgressRecipes) {
      if (inProgressRecipes.meals[idCurrent]) {
        const bla = document.querySelector('.start-recipe');
        bla.innerHTML = 'Continuar Receita';
      }
    }
  }

  teste(recipe) {
    if (localStorage.favoriteRecipes) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const receitaAtual = favRecipes.find((element) => (element.id === recipe.idMeal));
      if (favRecipes.includes(receitaAtual)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
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

  checkRecipesDone({ idMeal }) {
    if (localStorage.doneRecipes) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const isDone = doneRecipes.find((element) => (element.id === idMeal));
      if (isDone) {
        return true;
      }
      return false;
    }
  }

  redirectFromState(recipe) {
    const { idCurrent } = this.props;
    const { history } = this.props;
    localStorage.setItem('ReceitaIniciada', JSON.stringify(recipe.idMeal));
    const getCheckedItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getCheckedItems) {
      const objValue = getCheckedItems.meals[idCurrent];
      if (objValue) {
        getCheckedItems.meals = { [idCurrent]: objValue };
        localStorage.setItem('inProgressRecipes', JSON.stringify(getCheckedItems));
      } else {
        getCheckedItems.meals = { [idCurrent]: [] };
        localStorage.setItem('inProgressRecipes', JSON.stringify(getCheckedItems));
      }
    }
    history.push(`/comidas/${idCurrent}/in-progress`);
  }

  render() {
    const { Meal,
      RecommendedDrinks,
      x,
      Ingredients,
      Measures,
      Video } = this.state;
    const { history } = this.props;
    const recipe = Meal[0];
    const zero = 0;
    return (
      <div className="food-drink-detail-container">
        {Meal.length > zero ? Meal[0] && (
          <div className="detail-card">
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
                <div>
                  <input
                    type="image"
                    className="share-btn"
                    data-testid="share-btn"
                    src={ shareIcon }
                    onClick={ (event) => this.handleShareFood(event, recipe) }
                    alt="shareIcon"
                  />
                  <input
                    type="image"
                    data-testid="favorite-btn"
                    className="fav-button"
                    src={ this.teste(recipe) }
                    onClick={ () => this.setLocalState(recipe) }
                    alt="whiteHeartIcon"
                  />
                </div>
              </div>
            </div>
            <hr className="card-hr" />
            <h2>Ingredients</h2>
            <div className="ingredients">
              <ul className="detail-ingredients">
                {Ingredients.map((recipes, i) => (
                  <li
                    key={ `${i}-key` }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {recipes}
                    -
                    { Measures[i] }
                  </li>
                ))}
              </ul>
            </div>
            <h2>Instructions</h2>
            <div className="detail-instructions" data-testid="instructions">
              {recipe.strInstructions}
            </div>
            <p data-testid="0-card-name">{recipe.strMeal}</p>
            <h2>Recomendadas</h2>
            <div className="video-div">
              <iframe
                data-testid="video"
                title="recipe-video"
                src={ `https://www.youtube.com/embed/${Video}` }
                frameBorder="0"
                allow="accelerometer;autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="slider">
              {RecommendedDrinks.map((recomend, i) => (
                <div
                  key={ i }
                  className="slide"
                  style={ { transform: `translateX(${x}%)` } }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <input
                    type="image"
                    src={ recomend.strDrinkThumb }
                    data-testid="recipe-photo"
                    alt="recipe-img"
                    onClick={ () => history.push(`/bebidas/${recomend.idDrink}`) }
                  />
                  <div className="text-slider-div">
                    <p>{recomend.strAlcoholic}</p>
                    <h4
                      data-testid={ `${i}-recomendation-title` }
                    >
                      {recomend.strDrink}
                    </h4>
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
            {(!this.checkRecipesDone(recipe))
              && (
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="start-recipe"
                  onClick={ () => this.redirectFromState(recipe) }
                >
                  Iniciar Receita
                </button>)}
          </div>
        ) : (
          <div className="details-loading">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  idCurrent: state.menu.currentID,
  favorite: state.menu.favorite,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchID: (endpoint) => dispatch(currentID(endpoint)),
  dispatchFavorite: (isFavorite, idMeal) => dispatch(favRecipe(isFavorite, idMeal)),
});

FoodsDetails.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchID: PropTypes.func.isRequired,
  idCurrent: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsDetails);
