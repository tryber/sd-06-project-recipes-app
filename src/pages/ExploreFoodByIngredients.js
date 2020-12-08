import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { addFoodIngredients } from '../redux/actions/searchRecipes';

function ExploreFoodByIngredients(props) {
  const { history: { location: { pathname } },
    pageConfig,
    isLoading,
    dispatchFetchIngredients,
    foodIngredients, ingredientConfig } = props;
  const { header } = pageConfig;

  useEffect(() => {
    dispatchFetchIngredients();
  }, []);

  const renderIngredients = (arrayFoodIngredients, boolIsLoading, config) => {
    if (!boolIsLoading) {
      return (
        arrayFoodIngredients
          .map((ingredient, index) => (
            <IngredientCard
              thumb={ `https://www.themealdb.com/images/ingredients/${ingredient[config.name]}-Small.png` }
              name={ ingredient[config.name] }
              key={ `${index} ingredient` }
              pathname={ pathname }
              index={ index }
            />))
      );
    }
  };

  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      {renderIngredients(foodIngredients, isLoading, ingredientConfig)}

      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidasIngredientes,
  ingredientConfig: state.sitemap.comidas.ingredients,
  isLoading: state.searchRecipes.isIngredientsLoading,
  foodIngredients: state.searchRecipes.foodIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchIngredients: () => dispatch(addFoodIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodByIngredients);

ExploreFoodByIngredients.propTypes = {
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
  isLoading: PropTypes.bool.isRequired,
  dispatchFetchIngredients: PropTypes.func.isRequired,
  foodIngredients: PropTypes.arrayOf(PropTypes.any).isRequired,
  ingredientConfig: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
