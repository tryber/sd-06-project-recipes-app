import React from 'react';
import propTypes from 'prop-types';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';

function Bebidas({ history }) {
  return (
    <div>
      <SearchBar history={ history } />
      <h1>Bebidas</h1>
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Bebidas;
