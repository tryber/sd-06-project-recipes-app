import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExplorarBebidas() {
  const history = useHistory();
  const surpriseDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const responseJson = await response.json();
    console.log(responseJson);
    return history.push(
      {
        pathname: `/bebidas/${responseJson.drinks[0].idDrink}`,
        state: { recipe: responseJson.drinks[0] },
      },
    );
  };
  return (
    <div className="food">
      <Header title="Explorar Bebidas" />
      <div className="div-buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="button-ingredient"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <br />
        <button
          className="button-surprise"
          data-testid="explore-surprise"
          type="button"
          onClick={ surpriseDrink }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
