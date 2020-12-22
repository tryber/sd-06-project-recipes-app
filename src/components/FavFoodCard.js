import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavFoodCard extends React.Component {
  constructor() {
    super();

    this.state = {
      Food: [],
      Update: false,
    };
    this.handleShareFood = this.handleShareFood.bind(this);
    this.setFavoriteFood = this.setFavoriteFood.bind(this);
    this.getFullDate = this.getFullDate.bind(this);
    this.setLocalState = this.setLocalState.bind(this);
    this.changeFavoriteIcon = this.changeFavoriteIcon.bind(this);
  }

  componentDidMount() {
    const foods = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (foods) {
      const filteredFood = foods.filter((element) => element.type === 'comida');
      this.setFavoriteFood(filteredFood);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { Update } = this.state;
    if (Update !== prevState.Update) {
      const foods = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (foods) {
        const filteredFood = foods.filter((element) => element.type === 'comida');
        this.setFavoriteFood(filteredFood);
      }
    }
  }

  async handleShareFood({ id }) {
    const textdiv = document.querySelector('.text-div');
    if ((textdiv).childNodes.length < 1) {
      const paragraph = document.createElement('p');
      paragraph.innerText = 'Link copiado!';
      paragraph.style.fontSize = '8px';
      paragraph.style.fontWeight = '100';
      textdiv.appendChild(paragraph);
    }
    const url = `http://localhost:3000/comidas/${id}`;
    await copy(url);
  }

  setFavoriteFood(Food) {
    this.setState({
      Food,
    });
  }

  getFullDate() {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const fullDate = `${day}/${month + 1}/${year} ${hours}:${minutes}:${seconds}`;
    return fullDate;
  }

  setLocalState(recipe) {
    const fullDate = this.getFullDate();
    const myObject = [{
      id: recipe.id,
      type: 'comida',
      area: recipe.area,
      category: recipe.category,
      alcoholicOrNot: '',
      name: recipe.alcoholicOrNot,
      image: recipe.image,
      doneDate: fullDate,
      tags: recipe.tags,
    }];
    const myLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const shareButton = document.querySelector('.fav-button');
    const blackHeart = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
    const zero = 0;
    const minusOne = -1;
    if (shareButton.src === blackHeart && myLocalStorage) {
      const itemToRemove = myLocalStorage
        .find((element) => (element.id === recipe.id));
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

  changeFavoriteIcon(recipe) {
    if (localStorage.favoriteRecipes) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const receitaAtual = favRecipes.find((element) => (element.id === recipe.id));
      if (favRecipes.includes(receitaAtual)) {
        return blackHeartIcon;
      }
      return whiteHeartIcon;
    }
    return whiteHeartIcon;
  }

  render() {
    const { history, indexAcc } = this.props;
    const { Food } = this.state;
    return (
      <div className="food-or-drink-done-card">
        {Food.map((element, index) => (
          <div key={ index } className="food-drink-card">
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              className="done-recipe-image"
              onClick={ () => history.push(`/comidas/${element.id}`) }
            />
            <div className="left-side-div">
              <div className="food-drink-top-div fav-drink-card">
                <div className="food-drink-titles">
                  <p data-testid={ `${index + indexAcc}-horizontal-top-text` }>
                    {`${element.area} - ${element.category}`}
                  </p>
                  <button
                    type="button"
                    data-testid={ `${index + indexAcc}-horizontal-name` }
                    onClick={ () => history.push(`/comidas/${element.id}`) }
                    value={ element.name }
                    className="button-title"
                  >
                    { element.name }
                  </button>
                </div>
                <div className="fav-card-image">
                  <div>
                    <input
                      type="image"
                      data-testid={ `${index + indexAcc}-horizontal-favorite-btn` }
                      className="fav-button"
                      src={ this.changeFavoriteIcon(element) }
                      onClick={ () => this.setLocalState(element) }
                      alt="whiteHeartIcon"
                    />
                    <input
                      type="image"
                      className="share-btn"
                      data-testid={ `${index + indexAcc}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share"
                      onClick={ () => this.handleShareFood(element) }
                      style={ { marginLeft: '10px' } }
                    />
                  </div>
                  <div className="text-div" />
                </div>
              </div>
            </div>
          </div>))}
      </div>
    );
  }
}

FavFoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FavFoodCard);
