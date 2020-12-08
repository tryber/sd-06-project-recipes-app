import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { addDrinkIngredients } from '../redux/actions/searchRecipes';

function ExploreDrinkByIngredients(props) {
  const { history: { location: { pathname } },
    pageConfig,
    isLoading,
    dispatchFetchIngredients, drinkIngredients, ingredientConfig } = props;
  const { header } = pageConfig;

  useEffect(() => {
    dispatchFetchIngredients();
  }, []);

  const renderIngredients = (arrayDrinkIngredients, boolIsLoading, config) => {
    if (!boolIsLoading) {
      return (
        arrayDrinkIngredients
          .map((ingredient, index) => (
            <IngredientCard
              name={ ingredient[config.name] }
              key={ `${index} ingredient` }
              pathname={ pathname }
              index={ index }
              thumb={ `https://www.thecocktaildb.com/images/ingredients/${ingredient[config.name]}-Small.png` }
            />))
      );
    }
  };

  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      {renderIngredients(drinkIngredients, isLoading, ingredientConfig)}

      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidasIngredientes,
  ingredientConfig: state.sitemap.bebidas.ingredients,
  isLoading: state.searchRecipes.isIngredientsLoading,
  drinkIngredients: state.searchRecipes.drinkIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchIngredients: () => dispatch(addDrinkIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreDrinkByIngredients);

ExploreDrinkByIngredients.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  ingredientConfig: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  dispatchFetchIngredients: PropTypes.func.isRequired,
  drinkIngredients: PropTypes.arrayOf(PropTypes.any).isRequired,
};
