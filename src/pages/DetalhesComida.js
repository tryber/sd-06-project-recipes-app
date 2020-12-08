import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardBebidaRecomendacao from '../components/CardBebidaRecomendacao';
import RecipeContext from '../context/RecipeContext';
import { fetchApiComidasDetalhes } from '../services/FetchApiComidas';
import '../components/MenuInferior.css';
import '../components/detalhes.css';
import share from '../images/shareIcon.svg';
import coracaoBranco from '../images/whiteHeartIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';

function DetalhesComidas() {
  const { idDaReceita } = useParams();
  const [estadoApiComidas, setEstadoApiComidas] = useState([]);
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const {
    retornoApi6Bebidas,
    iniciarReceitas,
    setIniciarReceitas,
    // receitasTerminadas,
  } = useContext(RecipeContext);
  console.log('teste', estadoApiComidas);

  const seis = 6;
  const zero = 0;

  const fetchComidasDetalhes = async () => {
    const response = await fetchApiComidasDetalhes(idDaReceita);
    setEstadoApiComidas(response);
  };

  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

  const history = useHistory();
  function handleIniciarReceita() {
    setIniciarReceitas([...iniciarReceitas, idDaReceita]);
    // console.log(idDaReceita);
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.meals) {
        idIniciados = Object.keys(inProgress.meals);
        if (!idIniciados.includes(idDaReceita)) {
          const novaReceita = {
            ...inProgress,
            meals: {
              ...inProgress.meals,
              [idDaReceita]: [],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(novaReceita));
        }
      } else {
        const newMeal = {
          ...inProgress,
          meals: {
            [idDaReceita]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
      }
    } else {
      const newMeal = {
        meals: {
          [idDaReceita]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
    }
    history.push(`/comidas/${idDaReceita}/in-progress`);
  }

  const continuarReceita = () => {
    history.push(`/comidas/${idDaReceita}/in-progress`);
  };

  const buttonIniciar = () => {
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.meals) {
        idIniciados = Object.keys(inProgress.meals);
        if (!idIniciados.includes(idDaReceita)) {
          return (
            <button
              data-testid="start-recipe-btn"
              className="IniciarReceita"
              type="button"
              id="IniciarReceita"
              onClick={ handleIniciarReceita }
            >
              Iniciar Receita
            </button>
          );
        }
        return (
          <button
            type="button"
            className="IniciarReceita"
            data-testid="start-recipe-btn"
            onClick={ continuarReceita }
          >
            Continuar Receita
          </button>
        );
      }
      return (
        <button
          data-testid="start-recipe-btn"
          className="IniciarReceita"
          type="button"
          id="IniciarReceita"
          onClick={ handleIniciarReceita }
        >
          Iniciar Receita
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        className="IniciarReceita"
        type="button"
        id="IniciarReceita"
        onClick={ handleIniciarReceita }
      >
        Iniciar Receita
      </button>
    );
  };

  const vinte = 20;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= vinte; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== ''
      && bebida[`strIngredient${numero}`] !== null) {
        array.push(
          <li
            data-testid={ `${numero - 1}-ingredient-name-and-measure` }
            className="titulo"
          >
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== '')
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}
          </li>,
        );
      }
    }
    return array;
  }

  console.log(receitasSalvas);

  function copiaLink() {
    const thousand = 1000;
    navigator.clipboard.writeText(window.location.href).then(() => {
      const link = document.createElement('span');
      link.innerHTML = 'Link copiado!';
      document.getElementById('link-compartilhar').appendChild(link);
      setTimeout(() => {
        document.getElementById('link-compartilhar').removeChild(link);
      }, thousand);
    }, () => {
      // eslint-disable-next-line
      alert('erro');
    });
  }
  console.log(window.location.href);
  // onClick={() => {navigator.clipboard.writeText(window.location.href)}}

  function favoritarReceita() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const favorito = {
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
      };
      const favoritosArray = JSON.parse(favoritos);
      const receitasFavoritas = [...favoritosArray, favorito];
      localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
      setReceitasSalvas(receitasFavoritas);
    } else {
      const favorito = {
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorito]));
      setReceitasSalvas([favorito]);
    }
  }

  function desfavoritarReceita() {
    const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoritosAtualizados = favoritos.filter((item) => item.id !== idDaReceita);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritosAtualizados));
    setReceitasSalvas(favoritosAtualizados);
  }

  function renderFavoritar() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const idsFavoritos = [];
      JSON.parse(favoritos).map((favorito) => idsFavoritos.push(favorito.id));
      console.log('testando', idsFavoritos);
      if (idsFavoritos.includes(idDaReceita)) {
        console.log('receita existe');
        return (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ desfavoritarReceita }
            src={ coracaoPreto }
          >
            <img src={ coracaoPreto } alt="coracao" />
          </button>);
      } return (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoritarReceita }
          src={ coracaoBranco }
        >
          <img src={ coracaoBranco } alt="coracao" />
        </button>);
    }
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoritarReceita }
        src={ coracaoBranco }
      >
        <img src={ coracaoBranco } alt="coracao" />
      </button>);
  }

  return (
    estadoApiComidas.map((comida, index) => (
      <div key={ index }>
        <img
          className="imagemReceita"
          data-testid="recipe-photo"
          src={ comida.strMealThumb }
          alt={ comida.strMeal }
        />
        <button type="button" data-testid="share-btn" onClick={ copiaLink }>
          <img src={ share } alt="share" />
        </button>
        { renderFavoritar() }
        <div id="link-compartilhar" />
        <h2 data-testid="recipe-title" className="titulo">{ comida.strMeal }</h2>
        <h4 data-testid="recipe-category" className="category titulo">
          {comida.strCategory}
        </h4>
        <div>
          <h3 className="titulo">Ingredientes</h3>
          {renderIngrediente(comida)}
        </div>
        <h3 className="titulo">Instruções</h3>
        <p data-testid="instructions" className="intrucoes">{comida.strInstructions}</p>

        <video
          className="video-receita"
          controls
          data-testid="video"
          src={ comida.strYoutube }
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ comida.strYoutube }
          />
        </video>
        <div className="recomendacao">
          {
            retornoApi6Bebidas
            && retornoApi6Bebidas.slice(zero, seis)
              .map((drink, indice) => (
                <button
                  data-testid={ `${indice}-recomendation-card` }
                  className="img-recomendacao"
                  key={ indice }
                  type="button"
                >
                  {CardBebidaRecomendacao(drink, indice)}
                </button>))
          }
        </div>
        {buttonIniciar()}
      </div>
    )));
}

export default DetalhesComidas;
