import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchApiBebidasDetalhes } from '../services/FetchApiBebidas';
import '../components/MenuInferior.css';
import '../components/detalhes.css';
import share from '../images/shareIcon.svg';
import coracaoBranco from '../images/whiteHeartIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';
import './progresso.css';

function DetalhesBebida() {
  const { idDaReceita } = useParams();
  const [estadoApiBebidas, setEstadoApiBebidas] = useState([]);
  const [setReceitasSalvas] = useState([]);
  const ingredientes = localStorage
    .getItem('inProgressRecipes') ? JSON
      .parse((localStorage.getItem('inProgressRecipes'))).cocktails[idDaReceita] : [];

  const [
    ingredientesNoLocalStorage, setIngredientesNoLocalStorage] = useState(ingredientes);
  // console.log(receitasSalvas);

  const fetchBebidasDetalhes = async () => {
    const response = await fetchApiBebidasDetalhes(idDaReceita);
    setEstadoApiBebidas(response);
  };

  const history = useHistory();

  const inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
  let bebidaLocalStorage;

  function checkHandle(e, index) {
    if (e.target.checked === true) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'line-through';
      if (localStorage.getItem('inProgressRecipes')) {
        if (localStorage.getItem('inProgressRecipes').cocktails) {
          bebidaLocalStorage = inProgress.cocktails[idDaReceita];
          bebidaLocalStorage = bebidaLocalStorage.concat(document
            .getElementById(`${index - 1}-ingredient-check`).innerText);
          const newStorage = {
            ...inProgress,
            cocktails: {
              ...inProgress.cocktails,
              [idDaReceita]: bebidaLocalStorage,
            },
          };
          setIngredientesNoLocalStorage(bebidaLocalStorage);
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        } else {
          const progress = JSON.parse((localStorage.getItem('inProgressRecipes')));
          bebidaLocalStorage = progress.cocktails[idDaReceita];
          bebidaLocalStorage = [...bebidaLocalStorage,
            document.getElementById(`${index - 1}-ingredient-check`)
              .innerText];
          const newStorage = {
            ...progress,
            cocktails: {
              [idDaReceita]: bebidaLocalStorage,
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
          setIngredientesNoLocalStorage(bebidaLocalStorage);
        }
      } else {
        bebidaLocalStorage = [document.getElementById(`${index - 1}-ingredient-check`)
          .innerText];
        const newStorage = {
          cocktails: {
            [idDaReceita]: bebidaLocalStorage,
          },
        };
        setIngredientesNoLocalStorage(bebidaLocalStorage);
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }
    }
    if (e.target.checked === false) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'none';
      const progress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (progress) {
        // console.log('inprogress');
        if (progress.cocktails) {
          // console.log('cocktails');
          bebidaLocalStorage = progress.cocktails[idDaReceita]
            .filter((comidaLocal) => comidaLocal !== document
              .getElementById(`${index - 1}-ingredient-check`).innerText);
          const newStorage = {
            ...progress,
            cocktails: {
              [idDaReceita]: bebidaLocalStorage,
            },
          };
          setIngredientesNoLocalStorage(bebidaLocalStorage);
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        }
      }
    }
  }

  useEffect(() => {
    fetchBebidasDetalhes();
  }, []);

  const quinze = 15;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= quinze; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== null
      && bebida[`strIngredient${numero}`] !== '') {
        array.push(
          <label
            id={ `${numero - 1}-ingredient-check` }
            htmlFor={ `${numero - 1}-ingredient-step` }
            data-testid={ `${numero - 1}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${numero - 1}-ingredient-step` }
              className="titulo checkBox"
              onChange={ (e) => checkHandle(e, numero) }
              checked={ (bebida[`strMeasure${numero}`] !== null)
                ? (ingredientesNoLocalStorage.includes(
                  `${bebida[`strIngredient${numero}`]} ${bebida[`strMeasure${numero}`]}`,
                ))
                : (ingredientesNoLocalStorage.includes(
                  `${bebida[`strIngredient${numero}`]} `,
                )) }
            />
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== null)
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}

          </label>,
        );
      }
    }
    return array;
  }
  function copiaLink() {
    const thousand = 1000;
    const copiado = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(copiado).then(() => {
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
  // console.log(estadoApiBebidas);

  function favoritarReceita() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const favorito = {
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
      };
      const favoritosArray = JSON.parse(favoritos);
      const receitasFavoritas = [...favoritosArray, favorito];
      localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
      setReceitasSalvas(receitasFavoritas);
    } else {
      const favorito = {
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
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
      // console.log('testando', idsFavoritos);
      if (idsFavoritos.includes(idDaReceita)) {
        // console.log('receita existe');
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

  function checkDisable() {
    const arrayDeIngredientes = [];
    // pega todos os ingredientes da receita e joga no arrayDeIngredientes
    for (let i = 1; i <= quinze; i += 1) {
      const ing = `strIngredient${i}`;
      const ingName = estadoApiBebidas[0][ing];
      if (ingName !== null && ingName !== '') {
        arrayDeIngredientes.push(ingName);
      }
    }
    // ingredientes é a variável com os itens checked
    if (ingredientes.length === arrayDeIngredientes.length) {
      return false;
    }
    return true;
  }

  function redirectFeitas() {
    if (localStorage.getItem('doneRecipes')) {
      const feitasStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      // console.log('feitasStorage', feitasStorage);
      const receitaFeita = {
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
        doneDate: new Date().toDateString(),
        tags: [],
      };
      const newDoneRecipes = [
        ...feitasStorage,
        receitaFeita,
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      const receitaFeita = [{
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
        doneDate: new Date().toDateString(),
        tags: [],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(receitaFeita));
    }
    history.push('/receitas-feitas');
  }

  return (
    (!estadoApiBebidas)
      ? (<p>Loading...</p>)
      : estadoApiBebidas.map((bebida, index) => (
        <div key={ index }>
          <img
            className="imagemReceita"
            data-testid="recipe-photo"
            src={ bebida.strDrinkThumb }
            alt={ bebida.strDrink }
          />
          <button type="button" data-testid="share-btn" onClick={ copiaLink }>
            <img src={ share } alt="share" />
          </button>
          { renderFavoritar() }
          <div id="link-compartilhar" />
          <h2 data-testid="recipe-title" className="titulo">{ bebida.strDrink }</h2>
          <h4 data-testid="recipe-category" className="category titulo">
            {bebida.strAlcoholic}
          </h4>
          <div className="ingredientes-check">
            <h3 className="titulo">Ingredientes</h3>
            {renderIngrediente(bebida)}
          </div>
          <h3 className="titulo">Instruções</h3>
          <p data-testid="instructions" className="instrucoes">
            {bebida.strInstructions}
          </p>
          <button
            className="finalizar"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ checkDisable() }
            onClick={ redirectFeitas }
          >
            Finalizar receita
          </button>
        </div>
      )));
}

export default DetalhesBebida;
