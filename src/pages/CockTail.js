import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
import { addDrinkRecipes, addRecipes,
  changeIsFetchin, addDrinkCategories } from '../redux/actions/searchRecipes';
import useFetch from '../helpers/effects/useFetch';
import DrinkCategoriesButtons from '../components/DrinkCategoriesButtons';

function CockTail(props) {
  const { history: { location: { pathname } },
    pageConfig,
    fetchmap,
    dispatchRecipes,
    dispatchInitialRecipes,
    data,
    isFetchin,
    dispatchFetching,
    dispatchCategories,
    drinkRecipes,
    categoriesFilterActive } = props;

  const componentIsMounted = useRef(true);

  const { header, recipe } = pageConfig;
  const { title } = header;
  const { inputText, radioSearchSelection } = data;
  useFetch(
    title,
    inputText,
    radioSearchSelection,
    dispatchRecipes,
    isFetchin,
    dispatchFetching,
    fetchmap,
    recipe,
    componentIsMounted,
  );

  useEffect(() => {
    dispatchCategories();

    if (!drinkRecipes || !drinkRecipes.length) {
      dispatchInitialRecipes();
    }
  }, []);

  return (

    <>

      {console.log(drinkRecipes) }
      <Header
        pathname={ pathname }
        componentConfig={ header }
      />
      <DrinkCategoriesButtons />
      <RecipesList
        title={ title }
        recipeConfig={ recipe }
        pathname={ pathname }
        isLoading={ isFetchin }
        filter={ categoriesFilterActive }
        recipes={ drinkRecipes }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  isRecipesFetching: state.searchRecipes.isRecipesFetching,
  drinkRecipes: state.searchRecipes.recipes.drinks,
  pageConfig: state.sitemap.bebidas,
  fetchmap: state.fetchmap,
  data: state.searchRecipes.data,
  isFetchin: state.searchRecipes.isFetchin,
  categoriesFilterActive: state.searchRecipes.categoriesFilterActive,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFetching: (isFetchin) => dispatch(changeIsFetchin(isFetchin)),
  dispatchCategories: (categories) => dispatch(addDrinkCategories(categories)),
  dispatchInitialRecipes: () => (
    dispatch(addDrinkRecipes())
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CockTail);

CockTail.propTypes = {

  data: PropTypes.shape({
    inputText: PropTypes.string.isRequired,
    radioSearchSelection: PropTypes.string.isRequired,
  }).isRequired,
  fetchmap: PropTypes.shape({
    all: PropTypes.func,
  }).isRequired,
  isFetchin: PropTypes.bool.isRequired,
  dispatchCategories: PropTypes.func.isRequired,
  dispatchFetching: PropTypes.func.isRequired,
  dispatchInitialRecipes: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
    recipe: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  categoriesFilterActive: PropTypes.shape({
    Comidas: PropTypes.bool.isRequired,
    Bebidas: PropTypes.bool.isRequired,
  }).isRequired,
};
