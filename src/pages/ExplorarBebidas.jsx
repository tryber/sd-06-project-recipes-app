import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as api from '../services/Api';

export default function ExplorarBebidas({ history }) {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Bebidas');
  }, []);

  const onClick = async () => {
    const drinks = await api.fetchDrinkRandom();
    history.push(`/bebidas/${drinks[0].idDrink}`);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Header titulo={ titulo } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="btn btn-warning mt-2 mb-3"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ onClick }
        className="btn btn-warning"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExplorarBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};
