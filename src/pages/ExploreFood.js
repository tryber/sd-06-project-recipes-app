import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ButtonsExploreRecipes from '../components/ButtonsExploreRecipes';
import { addRecipes, addFoodRecipes } from '../redux/actions/searchRecipes';

import Footer from '../components/Footer';

function ExploreFood(props) {
  const { history: { location: { pathname } }, pageConfig,
    foodRecipes, isLoading, dispatchInitialRecipes, dispatchRecipes } = props;
  const { header } = pageConfig;
  const { title } = header;

  useEffect(() => {
    const zero = 0;
    const recipes = JSON.parse(localStorage.getItem('foodItems'));
    console.log(foodRecipes, recipes);
    if (recipes !== null && foodRecipes.length === zero) {
      dispatchRecipes(recipes);
    } else if (foodRecipes.length === zero) {
      dispatchInitialRecipes();
    }
  }, []);

  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      { !isLoading ? <ButtonsExploreRecipes
        pathname={ pathname }
        title={ title }
        recipes={ foodRecipes }
        idType="idMeal"
      /> : null}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarComidas,
  foodRecipes: state.searchRecipes.recipes.meals,
  isLoading: state.searchRecipes.isRecipesFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchInitialRecipes: () => dispatch(addFoodRecipes()),
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFood);

ExploreFood.propTypes = {
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
  dispatchInitialRecipes: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  foodRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
