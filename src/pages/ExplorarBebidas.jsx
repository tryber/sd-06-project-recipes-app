import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestApiDrinkSurprise } from '../services/requestDrink';
import '../styles/marginHederAndFooter.css';
import '../styles/Explorar.css';

function ExplorarBebidas({ history }) {
  async function handleRandomDrinkPage() {
    const response = await requestApiDrinkSurprise();
    const id = response[0].idDrink;
    const randomDrinkEndpoint = `/bebidas/${id}`;
    console.log(randomDrinkEndpoint);
    history.push(randomDrinkEndpoint);
  }

  return (
    <div className="container-margin-heder container-margin-footer">
      <Header name="Explorar Bebidas" button={ false } />
      <div className="container-big-btn">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="big-btn globo-icon"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          className="big-btn surpresa-icon"
          onClick={ () => handleRandomDrinkPage() }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExplorarBebidas.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default ExplorarBebidas;
