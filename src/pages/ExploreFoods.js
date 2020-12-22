import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { randomRecipeFoods } from '../services';
import { Footer, Header } from '../components';

class ExploreFoods extends React.Component {
  constructor() {
    super();
    this.randomRequestRecipe = this.randomRequestRecipe.bind(this);
  }

  componentDidMount() {
    this.changeH1Width();
  }

  changeH1Width() {
    const h1 = document.querySelector('.global-h1');
    const profileDiv = document.querySelector('.profile-icon-div');
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      h1.style.fontSize = '25px';
      profileDiv.style.width = '90px';
      const searchInputDiv = document.querySelector('.search-input-div');
      searchInputDiv.style.width = '70px';
    }
  }

  async randomRequestRecipe() {
    const { history } = this.props;
    const random = await randomRecipeFoods();
    const id = random[0].idMeal;
    history.push(`/comidas/${id}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="explore-buttons">
        <div className="explore-buttons-div">
          <Header history={ history } />
          <button
            type="button"
            className="explore-button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            className="explore-button"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            className="explore-button"
            data-testid="explore-surprise"
            onClick={ () => this.randomRequestRecipe() }
          >
            Me Surpreenda!
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

ExploreFoods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreFoods);
