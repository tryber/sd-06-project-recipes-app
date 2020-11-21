import React from 'react';
import propTypes from 'prop-types';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';

function Comidas({ history }) {
  return (
    <div>
      <SearchBar history={ history } />
      <h1>COmidas</h1>
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Comidas;
