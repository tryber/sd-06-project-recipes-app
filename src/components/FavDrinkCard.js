import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavDrinkCard extends React.Component {
  constructor() {
    super();

    this.state = {
      Drink: [],
      Update: false,
    };
    this.handleShareDrink = this.handleShareDrink.bind(this);
    this.setFavoriteDrink = this.setFavoriteDrink.bind(this);
  }

  componentDidMount() {
    const drinks = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drinks) {
      const filteredDrink = drinks.filter((element) => element.type === 'bebida');
      this.setFavoriteDrink(filteredDrink);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { Update } = this.state;
    if (Update !== prevState.Update) {
      const drinks = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (drinks) {
        const filteredDrink = drinks.filter((element) => element.type === 'bebida');
        this.setFavoriteDrink(filteredDrink);
      }
    }
  }

  async handleShareDrink({ target }, { id }) {
    const zero = 0;
    const textDiv = target.parentNode.childNodes[2];
    if ((textDiv).childNodes.length <= zero) {
      const paragraph = document.createElement('p');
      paragraph.innerText = 'Link copiado!';
      paragraph.style.fontSize = '8px';
      paragraph.style.fontWeight = '100';
      textDiv.appendChild(paragraph);
    }
    const url = `http://localhost:3000/bebidas/${id}`;
    await copy(url);
  }

  setFavoriteDrink(Drink) {
    this.setState({
      Drink,
    });
  }

  setLocalState(recipe) {
    const myObject = [{
      id: recipe.id,
      type: 'bebida',
      area: '',
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
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
    const { Drink } = this.state;
    return (
      <div className="food-or-drink-done-card">
        {Drink.map((element, index) => (
          <div key={ index } className="food-drink-card">
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/bebidas/${element.id}`) }
              className="done-recipe-image"
            />
            <div className="left-side-div">
              <div className="food-drink-top-div fav-drink-card">
                <div className="food-drink-titles">
                  <p data-testid={ `${index + indexAcc}-horizontal-top-text` }>
                    {element.alcoholicOrNot}
                  </p>
                  <button
                    type="button"
                    data-testid={ `${index + indexAcc}-horizontal-name` }
                    onClick={ () => history.push(`/bebidas/${element.id}`) }
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
                      onClick={ (event) => this.handleShareDrink(event, element) }
                      style={ { marginLeft: '10px' } }
                    />
                    <div className="text-div" />
                  </div>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    );
  }
}

FavDrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FavDrinkCard);
