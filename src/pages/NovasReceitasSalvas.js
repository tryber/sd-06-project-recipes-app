import React, { useState, useEffect } from 'react';
import Header2 from '../components/Header2';

function NovasReceitasSalvas() {
  const [arrayLocal, setArrayLocal] = useState([]);
  const [filtro, setFiltro] = useState('all');

  function recuperaNovasReceitas() {
    if (localStorage.getItem('newRecipes')); {
      const novasReceitas = JSON.parse(localStorage.getItem('newRecipes'));
      setArrayLocal(novasReceitas);
    }
  }

  useEffect(() => {
    recuperaNovasReceitas();
  }, []);

  useEffect(() => {
    recuperaNovasReceitas();
  }, arrayLocal);

  const receitasSalvas = JSON.parse(localStorage.getItem('newRecipes'));

  function filtraNovasReceitas() {
    if (filtro === 'all') {
      return receitasSalvas;
    }
    if (filtro === 'drinks') {
      if (!receitasSalvas) return [];
      return receitasSalvas.filter((receita) => receita.type === 'bebida');
    }
    if (filtro === 'foods') {
      if (!receitasSalvas) return [];
      return receitasSalvas.filter((receita) => receita.type === 'comida');
    }
    return [];
  }

  return (
    <div>
      <Header2 title="Minhas Receitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFiltro('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFiltro('drinks') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFiltro('foods') }
      >
        Food
      </button>
      <div>
        {
          filtraNovasReceitas() && filtraNovasReceitas().map((receita, index) => (
            receita.type === 'comida' ? (
              <div key={ index }>
                <img src={ receita.image } alt={ receita.name } />
                <h1>{ receita.name }</h1>
                <h3>{ receita.category }</h3>
                {receita.ingredients.map((ingrediente, indece1) => (
                  <ul key={ index }>
                    <li key={ indece1 }>{ingrediente}</li>
                  </ul>
                ))}
                <p>{receita.instructions}</p>
              </div>
            ) : (
              <div key={ index }>
                <img src={ receita.image } alt={ receita.name } />
                <h1>{ receita.name }</h1>
                <h3>{ receita.alcoholicOrNot }</h3>
                {receita.ingredients.map((ingrediente, indece2) => (
                  <ul key={ index }>
                    <li key={ indece2 }>{ingrediente}</li>
                  </ul>
                ))}
                <p>{receita.instructions}</p>
              </div>
            )
          ))
        }
      </div>
      <button
        type="button"
        onClick={ () => { localStorage.removeItem('newRecipes'); setArrayLocal([]); } }
      >
        Apagar Todas as Receitas
      </button>
      <br />
      <br />
      <a href="/nova-receita">Adicionar uma Nova Receita</a>
    </div>
  );
}

export default NovasReceitasSalvas;
