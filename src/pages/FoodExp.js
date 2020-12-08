import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodExp() {
  const { random, getRandomMeal } = useContext(Context);
  useEffect(() => {
    getRandomMeal();
  }, []);
  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      {!random ? <p>LOADING...</p>
        : (
          random.map((meal) => (
            <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
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

export default FoodExp;
