import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DrinkCard extends Component {
  render() {
    const { drink: { strDrink, strAlcoholic, strDrinkThumb }, idx } = this.props;

    return (
      <div>
        <img src={ strDrinkThumb } alt="" width={ 30 } />
        <span>{strAlcoholic}</span>
        <h5 data-testid={ `${idx}-recomendation-title` }>{strDrink}</h5>
      </div>
    );
  }
}

DrinkCard.propTypes = {
  drink: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
};

export default DrinkCard;
