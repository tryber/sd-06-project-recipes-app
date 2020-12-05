import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearState } from '../redux/actions/mainPageFetcher';
import './recipeCard.css';

const RecipeCard = ({ recipeName, recipeImage, id, foodOrDrink, index, limpar }) => (
  <Link to={ `${foodOrDrink}/${id}` } onClick={ () => limpar() }>
    <div data-testid={ `${index}-recipe-card` }>
      {
        console.log(recipeImage)
      }
      <img
        data-testid={ `${index}-card-img` }
        className="smallIMG"
        src={ recipeImage }
        alt="Foto da receita"
      />
      <div className="recipe-card-tag">
        <h5 data-testid={ `${index}-card-name` }>{recipeName}</h5>
      </div>
    </div>
  </Link>
);

const mapDispatchToProps = (dispatch) => ({
  limpar: () => dispatch(clearState()),
});

RecipeCard.propTypes = {
  limpar: PropTypes.func.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(RecipeCard);
