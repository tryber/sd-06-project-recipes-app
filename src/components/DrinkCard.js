import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class DrinkCard extends React.Component {
  constructor() {
    super();
    this.state = {
      Drink: [],
    };
    this.setDrinkState = this.setDrinkState.bind(this);
    this.handleShareDrink = this.handleShareDrink.bind(this);
  }

  async componentDidMount() {
    const drinks = JSON.parse(localStorage.getItem('doneRecipes'));
    if (drinks) {
      const filteredDrink = drinks.filter((element) => element.type === 'bebida');
      this.setDrinkState(filteredDrink);
    }
  }

  async handleShareDrink({ id }, { target }) {
    const two = 2;
    if ((target.parentNode).childNodes.length < two) {
      const { parentNode } = target;
      const paragraph = document.createElement('p');
      paragraph.innerText = 'Link copiado!';
      paragraph.style.fontSize = '8px';
      paragraph.style.fontWeight = '100';
      parentNode.appendChild(paragraph);
    }
    const url = `http://localhost:3000/comidas/${id}`;
    await copy(url);
  }

  setDrinkState(Drink) {
    this.setState({
      Drink,
    });
  }

  render() {
    const { Drink } = this.state;
    const { history, indexAcc } = this.props;
    return (
      <div className="food-or-drink-done-card">
        {Drink.map((element, index) => (
          <div key={ index + indexAcc } className="food-drink-card">
            <input
              type="image"
              data-testid={ `${index + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              className="done-recipe-image"
              onClick={ () => history.push(`/bebidas/${element.id}`) }
            />
            <div className="left-side-div">
              <div className="food-drink-top-div">
                <div className="food-drink-titles">
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
                <div className="food-drink-image">
                  <input
                    type="image"
                    data-testid={ `${index + indexAcc}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                    className="done-recipe-share-btn"
                    onClick={ (event) => this.handleShareDrink(element, event) }
                  />
                </div>
              </div>
              <aside className="food-drink-footer">
                <p data-testid={ `${index + indexAcc}-horizontal-done-date` }>
                  {element.doneDate}
                </p>
                <div className="tags-div">
                  <p data-testid={ `${index + indexAcc}-horizontal-top-text` }>
                    {element.alcoholicOrNot}
                  </p>
                </div>
              </aside>
            </div>
          </div>))}
      </div>
    );
  }
}

DrinkCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(DrinkCard);
