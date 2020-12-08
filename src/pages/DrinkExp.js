import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkExp() {
  const { random, getRandomDrink } = useContext(Context);
  useEffect(() => {
    getRandomDrink();
  }, []);
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      {!random ? <p>LOADING...</p>
        : (
          random.map((drink) => (
            <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>
              <button type="button" data-testid="explore-surprise">
                Me Surpreenda!
              </button>
            </Link>
          ))
        )}
      <Footer />
    </div>
  );
}

export default DrinkExp;
