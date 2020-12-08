import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import AreaDropDown from '../components/AreaDropDown';
import { fetchAreas, addFoodRecipes } from '../redux/actions/searchRecipes';

function ExploreFoodByArea(props) {
  const { history: { location: { pathname } }, pageConfig,
    dispatchFetchArea,
    dispatchInitialRecipes,
    areas, isAreasFetching, isFetchin, areaFilterActive, foodRecipes } = props;

  const { header, recipe } = pageConfig;
  const { title } = header;

  useEffect(() => {
    dispatchFetchArea();
    dispatchInitialRecipes();
  }, []);

  return (
    <>
      <Header
        componentConfig={ header }
        pathname={ pathname }
      />
      {!isAreasFetching && <AreaDropDown areas={ areas } />}
      <RecipesList
        title={ title }
        recipeConfig={ recipe }
        pathname={ pathname }
        isLoading={ isFetchin }
        filter={ areaFilterActive }
        recipes={ foodRecipes }
      />
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  foodRecipes: state.searchRecipes.recipes.meals,
  pageConfig: state.sitemap.explorarComidasLocalOrigem,
  isAreasFetching: state.searchRecipes.isAreasFetching,
  areas: state.searchRecipes.areas,
  isFetchin: state.searchRecipes.isFetchin,
  areaFilterActive: state.searchRecipes.areaFilterActive,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchArea: () => dispatch(fetchAreas()),
  dispatchInitialRecipes: () => dispatch(addFoodRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodByArea);

ExploreFoodByArea.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,

    }),
    recipe: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatchFetchArea: PropTypes.func.isRequired,
  dispatchInitialRecipes: PropTypes.func.isRequired,
  isAreasFetching: PropTypes.bool.isRequired,
  areas: PropTypes.arrayOf(PropTypes.any).isRequired,
  isFetchin: PropTypes.bool.isRequired,
  areaFilterActive: PropTypes.shape({
    'Explorar Origem': PropTypes.bool.isRequired,
  }).isRequired,
  foodRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,

};
