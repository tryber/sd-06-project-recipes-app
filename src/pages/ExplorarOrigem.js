import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAreasThunk, fetchMealByAreaThunk } from '../redux/actions/areaAction';
import Dropdown from '../components/Dropdown';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExplorarOrigem = ({
  areasThunk,
  selectedArea,
  mealByAreas,
  meals,
  location,
  isLoading,
}) => {
  const { pathname } = location;

  useEffect(() => {
    areasThunk();
  }, []);

  useEffect(() => {
    mealByAreas(selectedArea);
  }, [selectedArea, pathname]);

  if (isLoading) return <div>Carregando</div>;

  if (pathname === '/explorar/bebidas/area') return <div>Not Found</div>;

  return (
    <div>
      <Header pageName="Explorar Origem" renderSearch />
      <div className="default-page">
        <Dropdown currentArea={ selectedArea } />
        <div className="recipes-display">
          {
            meals.map(({ name, id, image }, index) => (
              <RecipeCard
                key={ id }
                recipeName={ name }
                recipeImage={ image }
                index={ index }
                id={ id }
                foodOrDrink={ pathname.includes('comidas') ? '/comidas' : '/bebidas' }
              />
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

ExplorarOrigem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedArea: PropTypes.string.isRequired,
  areasThunk: PropTypes.func.isRequired,
  mealByAreas: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  location: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedArea: state.areaReducer.selectedArea,
  meals: state.areaReducer.mealByArea,
  isLoading: state.areaReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  areasThunk: () => dispatch(fetchAreasThunk()),
  mealByAreas: (value) => dispatch(fetchMealByAreaThunk(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarOrigem);
