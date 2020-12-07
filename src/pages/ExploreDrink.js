import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApiDrink from '../services/FetchApiDrink';

function ExploreDrink() {
  const {
    drinkDetail,
    setDrinkDetail,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiDrink('randomDrink', setDrinkDetail);
  }, []);

  function randomRecipe() {
    const id = drinkDetail.map((drink) => drink.idDrink);
    window.location.pathname = `/bebidas/${id}`;
  }

  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomRecipe() }
      >
        Me Surpreenda!
      </button>

      <Footer />
    </div>
  );
}

export default ExploreDrink;
