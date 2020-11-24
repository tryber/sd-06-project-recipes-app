import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import { fetchDrinksById } from '../services';

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
    // pegando uma comida e uma bebida como exemplo
    // estas comidas/bebidas vão vir de outra tela
    // basta pegar do estado
    const { stateId } = this.props;
    if (stateId) {
      const drinks = await fetchDrinksById(stateId);
      this.setDrinkState(drinks);
    }
  }

  handleShareDrink({ idDrink }) {
    const url = `http://localhost:3000/bebidas/${idDrink}`;
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

  setDrinkState(Drink) {
    this.setState({
      Drink,
    });
  }

  render() {
    const { Drink } = this.state;
    const { history } = this.props;
    if (Drink) {
      return (
        <div>
          {Drink.map((element, index) => (
            <div key={ index }>
              <input
                type="image"
                data-testid={ `${index}-horizontal-image` }
                src={ element.strDrinkThumb }
                width="200px"
                alt="horizontal"
                onClick={ () => history.push(`/bebidas/${element.idDrink}`) }
              />

              <p data-testid={ `${index}-horizontal-top-text` }>
                {element.strAlcoholic}
              </p>
              <input
                type="button"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/bebidas/${element.idDrink}`) }
                value={ element.strDrink }
              />
              <p data-testid={ `${index}-horizontal-done-date` }>
                {element.dateModified}
              </p>

              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
                onClick={ () => this.handleShareDrink(element) }
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

DrinkCard.propTypes = {
  stateId: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateId: state.menu.currentID,
});

export default connect(mapStateToProps, null)(DrinkCard);
