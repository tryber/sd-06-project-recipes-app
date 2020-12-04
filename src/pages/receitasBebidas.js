import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header, Footer, RecipesCardDrinks } from '../components';

import getCockTail from '../services/theCockTailApi';
import addDrinks from '../actions/drinks';
import { addDrinksCategories } from '../actions/categories';

class ReceitasBebidas extends Component {
  async componentDidMount() {
    const { sendCockTail, location: { state } } = this.props;
    if (state && state.ing) {
      const { drinks } = await getCockTail(`filter.php?i=${state.ing}`);
      sendCockTail(drinks);
    } else {
      const { drinks } = await getCockTail('search.php?s=');
      sendCockTail(drinks);
    }
    this.getCategories();
  }

  async getCategories() {
    const { sendCocktailCategories } = this.props;
    const { drinks } = await getCockTail('list.php?c=list');
    sendCocktailCategories(drinks);
  }

  render() {
    return (
      <div>
        <Header title="Bebidas" />
        <RecipesCardDrinks />
        <Footer title="Bebidas" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCockTail: (drinks) => dispatch(addDrinks(drinks)),
  sendCocktailCategories: (drinks) => dispatch(addDrinksCategories(drinks)),
});

ReceitasBebidas.propTypes = {
  sendCocktailCategories: PropTypes.func.isRequired,
  sendCockTail: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.objectOf,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(ReceitasBebidas);
