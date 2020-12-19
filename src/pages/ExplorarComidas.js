import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExplorarComidas() {
  const history = useHistory();
  const surpriseFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseJson = await response.json();
    return history.push(
      {
        pathname: `/comidas/${responseJson.meals[0].idMeal}`,
        state: { recipe: responseJson.meals[0] },
      },
    );
  };

  return (
    <div className="food">
      <Header title="Explorar Comidas" />
      <div className="div-buttons">
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="button-ingredient"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <br />
        <Link to="/explorar/comidas/area">
          <button
            className="button-area"
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <br />
        <button
          className="button-surprise"
          data-testid="explore-surprise"
          type="button"
          onClick={ surpriseFood }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
