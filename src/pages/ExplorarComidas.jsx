import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import * as api from '../services/Api';

export default function ExplorarComidas({ history }) {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Explorar Comidas');
  }, []);

  const onClick = async () => {
    const food = await api.fetchFoodRandom();
    history.push(`/comidas/${food[0].idMeal}`);
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ onClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};
