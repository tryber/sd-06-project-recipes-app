import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { addRecipes, addFoodRecipes,
  changeIsFetchin, addFoodCategories } from '../redux/actions/searchRecipes';
import useFetch from '../helpers/effects/useFetch';
import Footer from '../components/Footer';
import FoodCategoriesButtons from '../components/FoodCategoriesButtons';

function Food(props) {
  const { history: { location: { pathname } },
    pageConfig,
    fetchmap,
    dispatchRecipes,
    dispatchInitialRecipes,
    data,
    isFetchin,
    iscategoriesFetching,
    dispatchFetching,
    dispatchCategories,
    foodRecipes,
    categoriesFilterActive,

  } = props;
  const componentIsMounted = useRef(true);

  const { header, recipe } = pageConfig;
  const { title } = header;
  const { inputText, radioSearchSelection } = data;

  useEffect(() => {
    dispatchCategories();

    if (!foodRecipes || !foodRecipes.length) {
      dispatchInitialRecipes();
    }
  }, []);

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

  // useFetchOnMount(fetchmap, title, dispatchRecipes);
  if (iscategoriesFetching) return <>Loading </>;
  return (
    <>
      {console.log(foodRecipes)}
      <Header
        pathname={ pathname }
        componentConfig={ header }
      />
      <FoodCategoriesButtons />
      <RecipesList
        title={ title }
        recipeConfig={ recipe }
        pathname={ pathname }
        isLoading={ isFetchin }
        filter={ categoriesFilterActive }
        recipes={ foodRecipes }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  foodRecipes: state.searchRecipes.recipes.meals,
  pageConfig: state.sitemap.comidas,
  fetchmap: state.fetchmap,
  data: state.searchRecipes.data,
  isFetchin: state.searchRecipes.isFetchin,
  iscategoriesFetching: state.searchRecipes.iscategoriesFetching,
  categories: state.searchRecipes.foodCategories,
  categoriesFilterActive: state.searchRecipes.categoriesFilterActive,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFetching: (isFetchin) => dispatch(changeIsFetchin(isFetchin)),
  dispatchCategories: () => (
    dispatch(addFoodCategories())),
  dispatchInitialRecipes: () => (
    dispatch(addFoodRecipes())
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Food);

Food.propTypes = {
  foodRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.shape({
    inputText: PropTypes.string.isRequired,
    radioSearchSelection: PropTypes.string.isRequired,
  }).isRequired,
  fetchmap: PropTypes.shape({
    all: PropTypes.func,
  }).isRequired,
  dispatchFetching: PropTypes.func.isRequired,
  dispatchInitialRecipes: PropTypes.func.isRequired,
  dispatchCategories: PropTypes.func.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
  isFetchin: PropTypes.bool.isRequired,
  iscategoriesFetching: PropTypes.bool.isRequired,

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
