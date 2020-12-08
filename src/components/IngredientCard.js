import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFoodByIngredient,
  fetchDrinkByIngredient } from '../redux/actions/searchRecipes';

function IngredientCard({ name, index, pathname, dispatchFetchDrinkByIngredient,
  dispatchFetchFoodByIngredient, isRecipesLoading, thumb }) {
  const [redirectState, setRedirectState] = useState(false);
  const componentRedirect = useRef(false);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  console.log(isRecipesLoading);

  useEffect(() => {
    if (componentRedirect.current && !isRecipesLoading) {
      setRedirectState(true);
    } else if (isRecipesLoading) {
      componentRedirect.current = true;
    }
  }, [isRecipesLoading]);

  useEffect(() => {
    if (thumb) setLoadingIngredients(false);
  }, [thumb]);

  const getCorrespondentRecipePage = (path) => {
    if (path.split('/').some((el) => el.includes('comidas'))) {
      return '/comidas';
    }
    return '/bebidas';
  };

  const handleClick = (ingredientName, path) => {
    if (getCorrespondentRecipePage(path) === '/comidas') {
      dispatchFetchFoodByIngredient(ingredientName);
      console.log('dispatchFetchFood');
    } else {
      dispatchFetchDrinkByIngredient(ingredientName);
      console.log('dispatchFetchdrink');
    }
  };

  const renderRedirectToMainPage = (boolRedirectState, path) => {
    if (boolRedirectState) {
      return <Redirect to={ getCorrespondentRecipePage(path) } replace />;
    }
  };

  const renderIngredientCard = (ingredientIndex, strThumb, ingredientName, path) => {
    if (!loadingIngredients) {
      return (
        <button
          type="button"
          onClick={ () => handleClick(ingredientName, path) }
          data-testid={ `${ingredientIndex}-ingredient-card` }
        >

          <p data-testid={ `${ingredientIndex}-card-name` }>{ingredientName}</p>

          <img
            src={ thumb }
            alt={ thumb }
            data-testid={ `${index}-card-img` }
          />
        </button>

      );
    }
  };

  return (
    <>
      {renderRedirectToMainPage(redirectState, pathname)}
      {renderIngredientCard(index, thumb, name, pathname)}

    </>
  );
}

const mapStateToProps = (state) => ({
  isRecipesLoading: state.searchRecipes.isRecipesOnClickFetching,
  foodThumbs: state.searchRecipes.foodIngredientsThumbs,
  drinkThumbs: state.searchRecipes.drinkIngredientsThumbs,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchFoodByIngredient: (ingredientName) => (
    dispatch(fetchFoodByIngredient(ingredientName))),
  dispatchFetchDrinkByIngredient: (ingredientName) => (
    dispatch(fetchDrinkByIngredient(ingredientName))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  dispatchFetchDrinkByIngredient: PropTypes.func.isRequired,
  dispatchFetchFoodByIngredient: PropTypes.func.isRequired,
  isRecipesLoading: PropTypes.bool.isRequired,
  thumb: PropTypes.string.isRequired,
};
