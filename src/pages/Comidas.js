import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipeContext from '../context/RecipeContext';
import CardComida from '../components/CardComida';
import FetchApiComidas, { fetchApiComidasByCategory } from '../services/FetchApiComidas';
import '../components/Card.css';
import './comidas-bebidas.css';

function Comidas() {
  const [categoriaAtual, setCategoriaAtual] = useState('');
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
  function changeCategory(category) {
    if (categoriaAtual === '') {
      renderCategory(category);
      setCategoriaAtual(category);
    }
    if (categoriaAtual === category) {
      renderAll();
      setCategoriaAtual(category);
    }
    if (categoriaAtual !== category) {
      renderCategory(category);
      setCategoriaAtual(category);
    }
  }
  return (
    <div>
      <Header title="Comidas" />
      <div className="container">
        <button
          className="Buttons"
          type="button"
          data-testid="All-category-filter"
          onClick={ renderAll }
        >
          All
        </button>

        {categoriesComida
          && categoriesComida.slice(zero, cinco).map((category, index) => (
            <button
              className="Buttons"
              key={ index }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => changeCategory(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))}

      </div>
      <div className="ComidasPage bodyRender">
        {
          retornoApiComidas ? retornoApiComidas.map((comida, index) => {
            if (index < doze) {
              return CardComida(comida, index);
            }
            return undefined;
          }) // eslint-disable-next-line no-alert
            : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        }
      </div>
      <MenuInferior />
    </div>
  );
}

export default Comidas;
