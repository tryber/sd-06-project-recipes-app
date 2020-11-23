import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import Footer from '../components/Footer';

function Comidas({ retrievedFood }) {
  const checkRequestSize = (request) => {
    const noLength = 0;
    const maxLength = 11;

    if (request === null) {
      customAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (request.length === noLength) {
      return null;
    } else if (request.length === 1) {
      const { idMeal } = request[0];
      return <Redirect to={ `/comidas/${idMeal}` } />;
    } else {
      return request.map((meal, index) => (
        index <= maxLength
          ? <MealCard meal={ meal } key={ meal.idmeal } index={ index } />
          : null));
    }
    return null;
  };
  return (
    <main>
      <Header pageName="Comidas" renderSearch />
      Comidas Page
      { checkRequestSize(retrievedFood) }
      <Footer />
    </main>
  );
}

const mapStateToProps = (state) => ({
  retrievedFood: state.searchReducer.meals,
});

Comidas.propTypes = {
  retrievedFood: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Comidas);
