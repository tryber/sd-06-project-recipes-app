import React, { useContext } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipeContext from '../context/RecipeContext';
import CardComida from '../components/CardComida';
import FetchApiComidas, { fetchApiComidasByCategory } from '../services/FetchApiComidas';

function Comidas() {
  const {
    setRetornoApiComidas,
    retornoApiComidas,
    categoriesComida,
  } = useContext(RecipeContext);

  const zero = 0;
  const doze = 12;
  const cinco = 5;

  async function renderAll() {
    const response = await FetchApiComidas('1', '');
    setRetornoApiComidas(response);
  }

  async function renderCategory(category) {
    const response = await fetchApiComidasByCategory(category);
    setRetornoApiComidas(response);
  }

  return (
    <div>
      <Header title="Comidas" />
      <div>
        <button type="button" onClick={ renderAll }>All</button>
        {categoriesComida
          && categoriesComida.slice(zero, cinco).map((category, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => renderCategory(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))}
      </div>
      {
        retornoApiComidas ? retornoApiComidas.map((comida, index) => {
          if (index < doze) {
            return CardComida(comida, index);
          }
          return undefined;
        }) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
      <MenuInferior />
    </div>
  );
}

export default Comidas;
