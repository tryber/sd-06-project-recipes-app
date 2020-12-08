import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import share from '../images/shareIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';
import '../components/detalhes.css';

function ReceitasFavoritas() {
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const [filtro, setFiltro] = useState('all');

  const history = useHistory();

  function recuperaFavoritos() {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setReceitasSalvas(favoritos);
      console.log(receitasSalvas);
    }
  }
  useEffect(() => {
    recuperaFavoritos();
  }, []);

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

  function desfavoritarReceita(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoritosAtualizados = favoritos.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritosAtualizados));
    setReceitasSalvas(favoritosAtualizados);
  }

  const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function filtraFavoritos() {
    if (filtro === 'all') {
      return favoritos;
    } if (filtro === 'drinks') {
      return favoritos.filter((receita) => receita.type === 'bebida');
    }
    return favoritos.filter((receita) => receita.type === 'comida');
  }

  return (
    <div>
      <Header2 title="Receitas Favoritas" />
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

      {
        filtraFavoritos() && filtraFavoritos().map((receita, index) => (
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
                <h1 data-testid={ `${index}-horizontal-name` }>
                  {receita.name}
                </h1>
              </button>
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${receita.area} - ${receita.category}`}
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
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => desfavoritarReceita(receita.id) }
                src={ coracaoPreto }
              >
                <img src={ coracaoPreto } alt="coracao" />
              </button>
            </div>
          )
            : (
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
                <span id={ `link-compartilhar-${receita.id}` } />
                <button
                  src={ share }
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copiaLink('bebidas', receita.id) }
                >
                  <img src={ share } alt="share" />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => desfavoritarReceita(receita.id) }
                  src={ coracaoPreto }
                >
                  <img src={ coracaoPreto } alt="coracao" />
                </button>
              </div>
            )
        ))
      }

    </div>
  );
}

export default ReceitasFavoritas;
