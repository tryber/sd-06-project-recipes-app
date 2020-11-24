import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header pathname={ pathname } />
      <p>página de explorar comida</p>
      <Footer />
    </div>
  );
}

export default ExploreFood;

ExploreFood.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
