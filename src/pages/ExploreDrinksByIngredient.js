import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { drinksIngredientsRender } from '../services';
import { controlState } from '../actions';

class ExploreDrinksByIngredient extends React.Component {
  constructor() {
    super();

    this.setIngredientsState = this.setIngredientsState.bind(this);
    this.redirectOnImage = this.redirectOnImage.bind(this);

    this.state = { ingredients: [] };
  }

  async componentDidMount() {
    this.changeH1Width();
    this.setIngredientsState();
  }

  async setIngredientsState() {
    this.setState({ ingredients: await drinksIngredientsRender() });
  }

  redirectOnImage(recipe) {
    const { history, dispatchControlState } = this.props;
    dispatchControlState(recipe);
    history.push('/bebidas');
  }

  changeH1Width() {
    const h1 = document.querySelector('.global-h1');
    const profileDiv = document.querySelector('.profile-icon-div');
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      h1.style.fontSize = '25px';
      profileDiv.style.width = '60px';
      const searchInputDiv = document.querySelector('.search-input-div');
      searchInputDiv.style.width = '50px';
    }
  }

  render() {
    const { ingredients } = this.state;
    const { history } = this.props;
    const listLength = 0;
    return (
      <div className="cards-container by-ingredient-container">
        <Header history={ history } />
        {ingredients.length > listLength ? (ingredients.map((recipe, index) => (
          <div className="card" key={ index } data-testid={ `${index}-ingredient-card` }>
            <input
              type="image"
              width="100%"
              src={ `https://www.thecocktaildb.com/images/ingredients/${recipe.strIngredient1}-Small.png` }
              data-testid={ `${index}-card-img` }
              alt={ `imagem de ${recipe.strIngredient}` }
              onClick={ () => this.redirectOnImage(recipe.strIngredient1) }
            />
            <hr className="card-hr" />
            <p data-testid={ `${index}-card-name` } className="bla">
              {recipe.strIngredient1}
            </p>
            <hr className="card-hr" />
          </div>
        ))) : (
          <div className="explore-ingredient-loading">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        <Footer history={ history } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchControlState: (control) => dispatch(controlState(control)),
});

ExploreDrinksByIngredient.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchControlState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExploreDrinksByIngredient);
