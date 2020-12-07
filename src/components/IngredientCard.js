import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './recipeCard.css';
import { redirectToIngredientThunk,
  clearState } from '../redux/actions/mainPageFetcher';

const IngredientCard = (props) => {
  const { ingredientName, ingredientImage,
    index, foodOrDrink,
    dispatchRequestedIngredient, clear } = props;
  return (
    <Link
      to={ foodOrDrink }
      className="done-recipe-card-container"
      onClick={ () => {
        clear();
        dispatchRequestedIngredient(ingredientName, foodOrDrink);
      } }
    >
      <div data-testid={ `${index}-ingredient-card` } className="done-recipe-card">
        <img
          data-testid={ `${index}-card-img` }
          className="smallIMG"
          src={ ingredientImage }
          alt="Foto da receita"
        />
        <div className="done-recipe-card-tag">
          <h5 data-testid={ `${index}-card-name` }>{ingredientName}</h5>
        </div>
      </div>
    </Link>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestedIngredient: (ingredient, pathname) => (
    dispatch(redirectToIngredientThunk(ingredient, pathname))
  ),
  clear: () => dispatch(clearState()),
});

IngredientCard.propTypes = {
  dispatchRequestedIngredient: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  ingredientName: PropTypes.string.isRequired,
  ingredientImage: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(IngredientCard);
