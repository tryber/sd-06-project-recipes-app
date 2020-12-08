import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { fetchRandomMeal } from '../services/foodAPI';

const ExplorarComidas = () => {
  const { randomMealID, setRandomMeal, setFetchById } = useContext(ReceitasContext);

  useEffect(() => {
    fetchRandomMeal().then((response) => {
      setRandomMeal(response.idMeal);
    });
  }, []);

  return (
    <div className="bg">
      <Header title="Explorar Comidas" />
      <div className="row justify-content-center align-items-center m-4">
        <div className="col my-4">
          <Link to="/explorar/comidas/ingredientes">
            <button
              data-testid="explore-by-ingredient"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              data-testid="explore-by-area"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
            >
              Por Local de Origem
            </button>
          </Link>
          <Link
            to={ `/comidas/${randomMealID}` }
            onClick={ () => setFetchById(false) }
          >
            <button
              data-testid="explore-surprise"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarComidas;
