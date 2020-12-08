import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import { getRecipesMealsByRandomIngredients } from '../services/mealsAPI';
import Header from '../components/Header';

function ExploreComidas() {
  const [idRecipeRandom, setRecipeRandom] = useState('');
  async function getRandom() {
    const result = await getRecipesMealsByRandomIngredients();
    setRecipeRandom(result[0].idMeal);
  }
  return (
    <div>
      <Header />
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={ getRandom }>
        Me Surpreenda!
      </button>
      {
        idRecipeRandom !== ''
          ? (<Redirect to={ `/comidas/${idRecipeRandom}` } />)
          : null
      }
      <Footer />
    </div>
  );
}

export default ExploreComidas;
