import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchApiComidasDetalhes } from '../services/FetchApiComidas';
import '../components/MenuInferior.css';
import '../components/detalhes.css';
import share from '../images/shareIcon.svg';
import coracaoBranco from '../images/whiteHeartIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';
import './progresso.css';

function ProgressoComida() {
  const { idDaReceita } = useParams();
  const [estadoApiComidas, setEstadoApiComidas] = useState([]);
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const ingredientes = localStorage
    .getItem('inProgressRecipes') ? JSON
      .parse((localStorage.getItem('inProgressRecipes'))).meals[idDaReceita] : [];

  const [
    ingredientesNoLocalStorage, setIngredientesNoLocalStorage] = useState(ingredientes);

  console.log(receitasSalvas);
  console.log('teste', estadoApiComidas);

  const fetchComidasDetalhes = async () => {
    const response = await fetchApiComidasDetalhes(idDaReceita);
    setEstadoApiComidas(response);
  };

  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

  const history = useHistory();
  const inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
  let comidaLocalStorage;
  function checkHandle(e, index) {
    if (e.target.checked === true) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'line-through';
      if (localStorage.getItem('inProgressRecipes')) {
        if (localStorage.getItem('inProgressRecipes').meals) {
          comidaLocalStorage = inProgress.meals[idDaReceita];
          comidaLocalStorage = comidaLocalStorage.concat(document
            .getElementById(`${index - 1}-ingredient-check`).innerText);
          const newStorage = {
            ...inProgress,
            meals: {
              ...inProgress.meals,
              [idDaReceita]: comidaLocalStorage,
            },
          };
          setIngredientesNoLocalStorage(comidaLocalStorage);
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        } else {
          const progress = JSON.parse((localStorage.getItem('inProgressRecipes')));
          comidaLocalStorage = progress.meals[idDaReceita];
          comidaLocalStorage = [...comidaLocalStorage,
            document.getElementById(`${index - 1}-ingredient-check`)
              .innerText];
          const newStorage = {
            ...progress,
            meals: {
              [idDaReceita]: comidaLocalStorage,
            },
          };
          setIngredientesNoLocalStorage(comidaLocalStorage);
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
          setIngredientesNoLocalStorage(comidaLocalStorage);
        }
      } else {
        comidaLocalStorage = [document.getElementById(`${index - 1}-ingredient-check`)
          .innerText];
        const newStorage = {
          meals: {
            [idDaReceita]: comidaLocalStorage,
          },
        };
        setIngredientesNoLocalStorage(comidaLocalStorage);
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }
    }
    if (e.target.checked === false) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'none';
      const progress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (progress) {
        comidaLocalStorage = progress.meals[idDaReceita]
          .filter((comidaLocal) => comidaLocal !== document
            .getElementById(`${index - 1}-ingredient-check`).innerText);
        const newStorage = {
          ...progress,
          meals: {
            [idDaReceita]: comidaLocalStorage,
          },
        };
        setIngredientesNoLocalStorage(comidaLocalStorage);
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }
    }
  }

  const vinte = 20;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= vinte; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== ''
      && bebida[`strIngredient${numero}`] !== null) {
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
              onChange={ (e) => { checkHandle(e, numero); } }
              checked={ (bebida[`strMeasure${numero}`] !== null)
                ? (ingredientesNoLocalStorage.includes(
                  `${bebida[`strIngredient${numero}`]} ${bebida[`strMeasure${numero}`]}`,
                ))
                : (ingredientesNoLocalStorage.includes(
                  `${bebida[`strIngredient${numero}`]} `,
                )) }
            />
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== ''
            && bebida[`strMeasure${numero}`] !== null)
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}
          </label>,
        );
      }
    }
    return array;
  }

  console.log(receitasSalvas);

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

  function checkDisable() {
    const arrayDeIngredientes = [];
    const quinze = 15;
    // pega todos os ingredientes da receita e joga no arrayDeIngredientes
    for (let i = 1; i <= quinze; i += 1) {
      const ing = `strIngredient${i}`;
      const ingName = estadoApiComidas[0][ing];
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
      console.log('feitasStorage', feitasStorage);
      const receitaFeita = {
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
        doneDate: new Date().toDateString(),
        tags: estadoApiComidas[0].strTags.split(','),
      };
      console.log('feita', receitaFeita);
      const newDoneRecipes = [
        ...feitasStorage,
        receitaFeita,
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      const receitaFeita = [{
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
        doneDate: new Date().toDateString(),
        tags: estadoApiComidas[0].strTags.split(','),
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(receitaFeita));
      console.log('feita', receitaFeita);
    }
    history.push('/receitas-feitas');
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
        <div className="ingredientes-check">
          <h3 className="titulo">Ingredientes</h3>
          {renderIngrediente(comida)}
        </div>
        <h3 className="titulo">Instruções</h3>
        <p data-testid="instructions" className="instrucoes">{comida.strInstructions}</p>

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

export default ProgressoComida;
