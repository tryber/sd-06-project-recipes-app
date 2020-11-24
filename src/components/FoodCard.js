import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import { fetchMealsById } from '../services';

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
    const { stateId } = this.props;
    // pegando uma comida e uma bebida como exemplo
    // estas comidas/bebidas vão vir de outra tela
    // basta pegar do estado
    if (stateId) {
      const foods = await fetchMealsById(stateId);
      this.setFoodState(foods);
    }
  }

  handleShareFood({ idMeal }) {
    const url = `http://localhost:3000/comidas/${idMeal}`;
    window.alert('Link copiado!');
    //  https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    const el = document.createElement('textarea');
    el.value = url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  setFoodState(Food) {
    this.setState({
      Food,
    });
  }

  render() {
    const { Food } = this.state;
    const { history } = this.props;
    if (Food) {
      return (
        <div>
          {Food.map((element, index) => (
            <div key={ index }>
              <input
                type="image"
                data-testid={ `${index}-horizontal-image` }
                src={ element.strMealThumb }
                width="200px"
                alt="horizontal"
                onClick={ () => history.push(`/comidas/${element.idMeal}`) }
              />

              <p id="area">
                {element.strArea}
              </p>

              <p data-testid={ `${index}-horizontal-top-text` }>
                {element.strCategory}
              </p>
              <input
                type="button"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/comidas/${element.idMeal}`) }
                value={ element.strMeal }
              />
              <p data-testid={ `${index}-horizontal-done-date` }>
                {element.dateModified}
              </p>

              {element.strTags.split(',').map((tag, i) => (
                <span key={ i } data-testid={ `${i}-${tag}-horizontal-tag` }>
                  { `${tag} `}
                </span>
              ))}

              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
                onClick={ () => this.handleShareFood(element) }
              />

            </div>))}
        </div>
      );
    }
    return (
      <div />
    );
  }
}

FoodCard.propTypes = {
  stateId: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateId: state.menu.currentID,
});

export default connect(mapStateToProps, null)(FoodCard);
