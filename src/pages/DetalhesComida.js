import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import {
  shareIcon, whiteHeartIcon, blackHeartIcon,
  setaDireita, setaEsquerda, loading,
} from '../images';
import '../style/DetalheProcesso.css';

function DetalhesComida() {
  const timeoutTextCopy = 3000;
  const SEIS = 6;
  const ZERO = 0;
  const UM = 1;
  const QUATRO = 4;
  const { data, isLoading } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataMeal, setDataMeal] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [next, setNext] = useState(ZERO);
  const [loadingMeal, setloadingMeal] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];
  const { location: { pathname } } = history;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    if (JSON.parse(localStorage.inProgressRecipes).meals) {
      const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).meals);
      continuar = ids.includes(idMeal);
    }
  }

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idMeal) {
          setIsFavorite(true);
        }
      });
    }
    if (localStorage.doneRecipes) {
      const doneRecipes = JSON.parse(localStorage.doneRecipes);
      doneRecipes.forEach((done) => {
        if (done.id === idMeal) {
          setIsDone(true);
        }
      });
    }
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setDataMeal(responseJson.meals[0]);
      setloadingMeal(false);
    }
    fetchAPI();
  }, [idMeal]);

  useEffect(() => {
    if (!isLoading) {
      setDrinks(data[1].drinks.filter((_, index) => index < SEIS));
    }
  }, [isLoading, data]);

  const changeNext = (valor) => {
    if ((next + valor) > QUATRO) return setNext(ZERO);
    if ((next + valor) < ZERO) return setNext(QUATRO);
    setNext(next + valor);
  };

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    let favoriteRecipes = [];
    if (!isFavorite) {
      if (localStorage.favoriteRecipes) {
        favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      }
      localStorage.favoriteRecipes = JSON.stringify([...favoriteRecipes, {
        id: dataMeal.idMeal,
        type: 'comida',
        area: dataMeal.strArea,
        category: dataMeal.strCategory,
        alcoholicOrNot: '',
        name: dataMeal.strMeal,
        image: dataMeal.strMealThumb,
      }]);
    } else {
      favoriteRecipes = JSON.parse(localStorage.favoriteRecipes)
        .filter(({ id }) => id !== dataMeal.idMeal);
      localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
    }
  };

  return (
    <div>
      {(loadingMeal) ? <img className="loading" src={ loading } alt="loading" />
        : (
          <div className="container-details-progress">
            <img
              className="img-details-progress"
              data-testid="recipe-photo"
              src={ dataMeal.strMealThumb }
              alt={ dataMeal.strMeal }
            />
            <div className="div-header">
              <div className="div-icon">
                <button
                  type="button"
                  onClick={ handleClick }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Botão de Favorito"
                    className="icons"
                  />
                </button>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => handleCopy(pathname) }
                >
                  <img
                    src={ shareIcon }
                    alt="Botão de Compartilhar"
                    className="icons"
                  />
                </button>
                { isCopied && <span className="copy">Link copiado!</span> }
              </div>
              <div className="div-title">
                <h1 data-testid="recipe-title">{ dataMeal.strMeal }</h1>
                <p data-testid="recipe-category">{ dataMeal.strCategory }</p>
              </div>
            </div>
            <div className="div-recipes">
              <h2>Ingredientes</h2>
              <ul>
                {
                  Object.keys(dataMeal)
                    .filter((keys) => keys.includes('Ingredient'))
                    .map((ingredient, index) => {
                      const measure = Object.keys(dataMeal)
                        .filter((keys) => keys.includes('Measure'));
                      const measureIndex = measure[index];
                      if (dataMeal[ingredient] !== '' && dataMeal[ingredient] !== null) {
                        return (
                          <li
                            key={ index }
                            data-testid={ `${index}-ingredient-name-and-measure` }
                          >
                            { `${dataMeal[ingredient]} - ${dataMeal[measureIndex]} ` }
                          </li>
                        );
                      }
                      return '';
                    })
                }
              </ul>
              <br />
              <h2>Instruções</h2>
              <p data-testid="instructions">{ dataMeal.strInstructions }</p>
              <br />
              <h2>Vídeo</h2>
              <div className="video" data-testid="video">
                <iframe
                  title="Recipe Video"
                  width="320"
                  height="250"
                  src={ dataMeal.strYoutube && dataMeal.strYoutube
                    .replace('watch?v=', 'embed/') }
                  frameBorder="0"
                  allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope;
                picture-in-picture"
                  allowFullScreen
                />
              </div>

              <h2>Recomendadas</h2>
              <div className="cards">
                <div className="scroller">
                  { drinks.map((drink, index) => (
                    <div
                      key={ index }
                      className={
                        (index !== next && index !== next + 1)
                          ? 'card invisible'
                          : 'card'
                      }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <Link to={ `/bebidas/${drink.idDrink}` }>
                        <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                        <h2
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { drink.strDrink }
                        </h2>
                      </Link>
                    </div>
                  )) }
                </div>
              </div>
              <div className="div-buttons-scroller">
                <button type="button" onClick={ () => { changeNext(-UM); } }>
                  <img src={ setaEsquerda } alt="Anterior" />
                </button>
                <button type="button" onClick={ () => { changeNext(UM); } }>
                  <img src={ setaDireita } alt="Próximo" />
                </button>
              </div>
            </div>
            <div className="buttons-footer">
              <div>
                <Link to="/comidas">
                  <button
                    className="back"
                    type="button"
                  >
                    Voltar
                  </button>
                </Link>
                <Link to={ `/comidas/${idMeal}/in-progress` }>
                  <button
                    className="finish-recipe"
                    data-testid="start-recipe-btn"
                    type="button"
                    hidden={ isDone }
                  >
                    { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) }
    </div>
  );
}

export default DetalhesComida;
