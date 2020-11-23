import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';

function Bebidas({ retrievedDrinks }) {
  const checkRequestSize = (request) => {
    const noLength = 0;
    const maxLength = 1;
    if (request === null) {
      customAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } if (request.length === noLength) {
      return null;
    } if (request.length === 1) {
      const { idDrink } = request[0];
      return <Redirect to={ `/bebidas/${idDrink}` } />;
    }
    return request.map((drink, index) => (
      index <= maxLength
        ? <DrinkCard drink={ drink } key={ drink.idDrink } index={ index } />
        : null));
  };

  return (
    <main>
      <Header pageName="Bebidas" renderSearch />
      Bebidas Page
      { checkRequestSize(retrievedDrinks) }
      <Footer />
    </main>
  );
}

const mapStateToProps = (state) => ({
  retrievedDrinks: state.searchReducer.drinks,
});

Bebidas.propTypes = {
  retrievedDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Bebidas);
