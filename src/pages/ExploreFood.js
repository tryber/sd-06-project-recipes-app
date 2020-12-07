import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApiFood from '../services/FetchApiFood';
import RecipesContext from '../context/RecipesContext';

function ExploreFood() {
  const {
    foodDetail,
    setFoodDetail,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiFood('randomFood', setFoodDetail);
  }, []);

  function randomRecipe() {
    const id = foodDetail.map((food) => food.idMeal);
    window.location.pathname = `/comidas/${id}`;
  }

  return (
    <div>
      <Header />
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
        onClick={ () => randomRecipe() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFood;
