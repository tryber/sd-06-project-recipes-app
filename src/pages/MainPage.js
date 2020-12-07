import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetcherThunk } from '../redux/actions/mainPageFetcher';
import CategoryMenu from '../components/CategoryMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MainPage = (props) => {
  const { recipeList, location: { pathname },
    isLoading, currentCategory, shouldFetch } = props;

  const checkRequestSize = (recipesToRender) => {
    const noLength = 0;
    if (recipesToRender === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipesToRender.length === noLength) {
      return null;
    } else if (recipesToRender.length === 1 && currentCategory === 'All') {
      const { id } = recipesToRender[0];
      return (
        <Redirect to={ `${pathname}/${id}` } />
      );
    } else {
      return (
        <main className="recipes-display">
          { recipesToRender.map(({ name, image, id }, index) => (
            <RecipeCard
              key={ id }
              recipeName={ name }
              recipeImage={ image }
              id={ id }
              foodOrDrink={ pathname }
              index={ index }
            />
          ))}
        </main>
      );
    }
  };

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (recipeList.length < 1 && shouldFetch) {
        dispatch(fetcherThunk(pathname));
      }
    }, [pathname, dispatch, recipeList, shouldFetch],
  );

  if (isLoading) return <div>carregando</div>;
  return (
    <div>
      <Header pageName={ pathname } renderSearch />
      <div className="default-page">
        <CategoryMenu pathname={ pathname } />
        {
          checkRequestSize(recipeList)
        }
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const zero = 0;
  const list = state.mainPageReducer.recipeList.length > zero
    ? state.mainPageReducer.recipeList
    : state.mainPageReducer.ingredientBasedRecipes;
  return ({
    currentCategory: state.categoryReducer.currentCategory,
    recipeList: list,
    isLoading: state.mainPageReducer.loading,
    shouldFetch: state.mainPageReducer.shouldFetchBaseRecipes,
  });
};

MainPage.propTypes = {
  shouldFetch: PropTypes.bool.isRequired,
  currentCategory: PropTypes.string.isRequired,
  recipeList: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MainPage);
