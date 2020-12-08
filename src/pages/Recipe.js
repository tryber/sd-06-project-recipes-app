import React from 'react';

import PropTypes from 'prop-types';

import FoodDetail from './FoodDetail';
// import DrinkDetail from './DrinkDetail';

function Recipe(props) {
  const { match } = props;
  return <FoodDetail match={ match } />;
}

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipe;
