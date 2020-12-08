import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { fetchRandomDrink } from '../services/drinkAPI';

const ExplorarBebidas = () => {
  const { randomDrinkID, setRandomDrink, setFetchById } = useContext(ReceitasContext);

  useEffect(() => {
    fetchRandomDrink().then((response) => {
      setRandomDrink(response.idDrink);
    });
  }, []);

  return (
    <div className="bg">
      <Header title="Explorar Bebidas" />
      <div className="row justify-content-center align-items-center m-4">
        <div className="col my-4">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              data-testid="explore-by-ingredient"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
            >
              Por Ingredientes
            </button>
          </Link>
          <Link
            to={ `/bebidas/${randomDrinkID}` }
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

export default ExplorarBebidas;
