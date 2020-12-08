import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import share from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [receitasFeitas, setRecietasFeitas] = useState([]);
  const [filtro, setFiltro] = useState('all');

  const history = useHistory();

  function recuperaFeitas() {
    if (localStorage.getItem('doneRecipes')) {
      const favoritos = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecietasFeitas(favoritos);
      console.log(receitasFeitas);
    }
  }
  useEffect(() => {
    recuperaFeitas();
  }, []);

  const feitas = JSON.parse(localStorage.getItem('doneRecipes'));

  function filtraFeitas() {
    if (filtro === 'all') {
      return feitas;
    } if (filtro === 'drinks') {
      return feitas.filter((receita) => receita.type === 'bebida');
    }
    return feitas.filter((receita) => receita.type === 'comida');
  }

  function copiaLink(tipo, id) {
    navigator.clipboard.writeText(`http://localhost:3000/${tipo}/${id}`).then(() => {
      const link = document.createElement('span');
      link.innerHTML = 'Link copiado!';
      document.getElementById(`link-compartilhar-${id}`).appendChild(link);
    }, () => {
      // eslint-disable-next-line
      alert('erro');
    });
  }

  return (
    <div>
      <Header2 title="Receitas Feitas" />
      <div className="container">
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
      </div>
      {
        filtraFeitas() && filtraFeitas().map((receita, index) => (
          receita.type === 'comida' ? (
            <div>
              <button
                type="button"
                onClick={ () => history.push(`comidas/${receita.id}`) }
              >
                <img
                  className="imagemReceita"
                  data-testid={ `${index}-horizontal-image` }
                  src={ receita.image }
                  alt="foto-ilustrativa"
                />
                <h1 className="feitas-name" data-testid={ `${index}-horizontal-name` }>
                  {receita.name}
                </h1>
              </button>
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${receita.area} - ${receita.category}`}
              </h3>
              <h3 data-testid={ `${index}-horizontal-done-date` }>{receita.doneDate}</h3>
              <h3 data-testid={ `${index}-${receita.tags[0]}-horizontal-tag` }>
                {receita.tags[0]}
              </h3>
              <h3 data-testid={ `${index}-${receita.tags[1]}-horizontal-tag` }>
                {receita.tags[1]}
              </h3>
              <span id={ `link-compartilhar-${receita.id}` } />
              <button
                src={ share }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copiaLink('comidas', receita.id) }
              >
                <img src={ share } alt="share" />
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={ () => history.push(`bebidas/${receita.id}`) }
              >
                <img
                  className="imagemReceita"
                  data-testid={ `${index}-horizontal-image` }
                  src={ receita.image }
                  alt="foto-ilustrativa"
                />
                <h1 data-testid={ `${index}-horizontal-name` }>
                  {receita.name}
                </h1>
              </button>
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {receita.alcoholicOrNot}
              </h3>
              <h3 data-testid={ `${index}-horizontal-done-date` }>{receita.doneDate}</h3>
              <span id={ `link-compartilhar-${receita.id}` } />
              <button
                src={ share }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copiaLink('bebidas', receita.id) }
              >
                <img src={ share } alt="share" />
              </button>
            </div>
          )
        ))
      }
    </div>
  );
}

export default ReceitasFeitas;
