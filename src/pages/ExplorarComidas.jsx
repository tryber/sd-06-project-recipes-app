import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';
import { requestApiMealSurprise } from '../services/requestFood';
import '../styles/marginHederAndFooter.css';
import '../styles/components.css';

function ExplorarComidas({ history }) {
  async function handleRandomMealPage() {
    const response = await requestApiMealSurprise();
    const id = response[0].idMeal;
    const randomMealEndpoint = `/comidas/${id}`;
    console.log(history);
    history.push(randomMealEndpoint);
  }

  return (
    <div className="container-margin-heder container-margin-footer">
      <Header name="Explorar Comidas" button={ false } />
      <div className="explore-btn">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="big-btn cesta-icon"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="big-btn globo-icon"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          className="big-btn surpresa-icon"
          onClick={ () => handleRandomMealPage() }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default ExplorarComidas;
