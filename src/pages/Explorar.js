import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';
import './explorar.css';

function Explorar() {
  const history = useHistory();

  function redirectExplorarComidas() {
    history.push('/explorar/comidas');
  }
  function redirectExplorarBebidas() {
    history.push('/explorar/bebidas');
  }
  return (
    <div>
      <Header2 title="Explorar" />
      <div className="explorar">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ redirectExplorarComidas }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ redirectExplorarBebidas }
        >
          Explorar Bebidas
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}

export default Explorar;
