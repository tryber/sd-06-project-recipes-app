import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';
import { fetchApiComidasExplorar } from '../services/FetchApiComidas';
import './explorar.css';

function ExplorarComidas() {
  const history = useHistory();
  // const { idDaReceita, setIdDaReceita } = useParams();

  function redirectExplorarIngredientes() {
    history.push('/explorar/comidas/ingredientes');
  }
  function redirectExplorarOrigem() {
    history.push('/explorar/comidas/area');
  }

  async function redirectExplorarSurpresa() {
    const response = await fetchApiComidasExplorar();
    const novoId = response[0].idMeal;
    history.push(`/comidas/${novoId}`);
  }

  return (
    <div>
      <Header2 title="Explorar Comidas" />
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
          data-testid="explore-by-area"
          onClick={ redirectExplorarOrigem }
        >
          Por Local de Origem
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

export default ExplorarComidas;
