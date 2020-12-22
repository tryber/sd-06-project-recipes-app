import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class FoodCard extends React.Component {
  constructor() {
    super();
    this.state = {
      Food: [],
    };
    this.setFoodState = this.setFoodState.bind(this);
    this.handleShareFood = this.handleShareFood.bind(this);
  }

  async componentDidMount() {
    const foods = JSON.parse(localStorage.getItem('doneRecipes'));
    if (foods) {
      const filteredFood = foods.filter((element) => element.type === 'comida');
      this.setFoodState(filteredFood);
    }
  }

  async handleShareFood({ id }, { target }) {
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

  setFoodState(Food) {
    this.setState({
      Food,
    });
  }

  render() {
    const { Food } = this.state;
    const { history, indexAcc } = this.props;
    return (
      <div className="food-or-drink-done-card">
        {Food.map((element, i) => (
          <div key={ i + indexAcc } className="food-drink-card">
            <input
              type="image"
              data-testid={ `${i + indexAcc}-horizontal-image` }
              src={ element.image }
              alt="horizontal"
              className="done-recipe-image"
              onClick={ () => history.push(`/comidas/${element.id}`) }
            />
            <div className="left-side-div">
              <div className="food-drink-top-div">
                <div className="food-drink-titles">
                  <p data-testid={ `${i + indexAcc}-horizontal-top-text` }>
                    {`${element.area} - ${element.category}`}
                  </p>
                  <button
                    type="button"
                    data-testid={ `${i + indexAcc}-horizontal-name` }
                    onClick={ () => history.push(`/comidas/${element.id}`) }
                    value={ element.name }
                    className="button-title"
                  >
                    { element.name }
                  </button>
                </div>
                <div className="food-drink-image">
                  <input
                    type="image"
                    data-testid={ `${i + indexAcc}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                    className="done-recipe-share-btn"
                    onClick={ (event) => this.handleShareFood(element, event) }
                  />
                </div>
              </div>
              <aside className="food-drink-footer">
                <p data-testid={ `${i + indexAcc}-horizontal-done-date` }>
                  {element.doneDate}
                </p>
                {typeof element.tags === 'string'
                  ? (
                    <div className="tags-div">
                      { element.tags.split(',')[0] !== undefined
                        ? (
                          <p
                            key="tag0"
                            data-testid={
                              `${i}-${element.tags.split(',')[0]}-horizontal-tag`
                            }
                          >
                            { `${element.tags.split(',')[0]}`}
                          </p>
                        ) : null }
                      { element.tags.split(',')[1] !== undefined
                        ? (
                          <p
                            key="tag1"
                            data-testid={
                              `${i}-${element.tags.split(',')[1]}-horizontal-tag`
                            }
                          >
                            {element.tags.split(',')[1]}
                          </p>
                        )
                        : null}

                    </div>)
                  : (
                    <div className="tags-div">
                      <p
                        key="tag0"
                        data-testid={ `${i}-${element.tags[0]}-horizontal-tag` }
                      >
                        { `${element.tags[0]}`}
                      </p>
                      <p
                        key="tag1"
                        data-testid={ `${i}-${element.tags[1]}-horizontal-tag` }
                      >
                        { `${element.tags[1]}`}
                      </p>
                    </div>
                  )}
              </aside>
            </div>
          </div>))}
      </div>
    );
  }
}

FoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FoodCard);
