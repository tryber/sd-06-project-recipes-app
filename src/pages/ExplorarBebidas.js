import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';
import { fetchApiBebidasExplorar } from '../services/FetchApiBebidas';
import './explorar.css';

function ExplorarBebidas() {
  const history = useHistory();

  function redirectExplorarIngredientes() {
    history.push('/explorar/bebidas/ingredientes');
  }
  async function redirectExplorarSurpresa() {
    const response = await fetchApiBebidasExplorar();
    const novoId = response[0].idDrink;
    history.push(`/bebidas/${novoId}`);
  }

  return (
    <div>
      <Header2 title="Explorar Bebidas" />
      <div className="explorar">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ redirectExplorarIngredientes }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectExplorarSurpresa }
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}

export default ExplorarBebidas;
