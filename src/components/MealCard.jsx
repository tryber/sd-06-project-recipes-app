import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealCard extends Component {
  render() {
    const { meal: { strMeal, strCategory, strMealThumb }, idx } = this.props;

    return (
      <div>
        <img src={ strMealThumb } alt="" width={ 30 } />
        <span>{strCategory}</span>
        <h5 data-testid={ `${idx}-recomendation-title` }>{strMeal}</h5>
      </div>
    );
  }
}

MealCard.propTypes = {
  meal: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
};

export default MealCard;
