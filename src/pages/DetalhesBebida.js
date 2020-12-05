import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import {
  shareIcon, whiteHeartIcon, blackHeartIcon,
  setaDireita, setaEsquerda, loading,
} from '../images';
import '../style/DetalheProcesso.css';

function DetalhesBebida() {
  const timeoutTextCopy = 3000;
  const SEIS = 6;
  const ZERO = 0;
  const UM = 1;
  const QUATRO = 4;
  const { data, isLoading } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [next, setNext] = useState(ZERO);
  const [LoadingDrink, setLoadingDrink] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];
  const { location: { pathname } } = history;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    if (JSON.parse(localStorage.inProgressRecipes).cocktails) {
      const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).cocktails);
      continuar = ids.includes(idDrink);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      setMeals(data[0].meals.filter((_, index) => index < SEIS));
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idDrink) {
          setIsFavorite(true);
        }
      });
    }
    if (localStorage.doneRecipes) {
      const doneRecipes = JSON.parse(localStorage.doneRecipes);
      doneRecipes.forEach((done) => {
        if (done.id === idDrink) {
          setIsDone(true);
        }
      });
    }
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setLoadingDrink(false);
    }
    fetchAPI();
  }, [idDrink]);

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
        id: dataDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: dataDrinks.strCategory,
        alcoholicOrNot: dataDrinks.strAlcoholic,
        name: dataDrinks.strDrink,
        image: dataDrinks.strDrinkThumb,
      }]);
    } else {
      favoriteRecipes = JSON.parse(localStorage.favoriteRecipes)
        .filter(({ id }) => id !== dataDrinks.idDrink);
      localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
    }
  };

  return (
    <div>
      {(LoadingDrink) ? <img className="loading" src={ loading } alt="loading" />
        : (
          <div className="container-details-progress">
            <img
              className="img-details-progress"
              data-testid="recipe-photo"
              src={ dataDrinks.strDrinkThumb }
              alt={ dataDrinks.strDrink }
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
                { isCopied ? <p>Link copiado!</p> : true }
              </div>
              <div className="div-title">
                <h1 data-testid="recipe-title">{ dataDrinks.strDrink }</h1>
                <p data-testid="recipe-category">{ dataDrinks.strAlcoholic }</p>
              </div>
            </div>
            <div className="div-recipes">
              <h2>Ingredientes:</h2>
              <ul>
                {
                  Object.keys(dataDrinks)
                    .filter((keys) => keys.includes('Ingredient'))
                    .map((ingred, index) => {
                      if (dataDrinks[ingred] !== '' && dataDrinks[ingred] !== null) {
                        const measure = Object.keys(dataDrinks)
                          .filter((keys) => keys.includes('Measure'));
                        const measureIndex = measure[index];
                        return (
                          <li
                            key={ index }
                            data-testid={ `${index}-ingredient-name-and-measure` }
                          >
                            { `${dataDrinks[ingred]} - ${dataDrinks[measureIndex]} ` }
                          </li>
                        );
                      }
                      return '';
                    })
                }
              </ul>
              <br />
              <h2>Instruções:</h2>
              <p data-testid="instructions">{ dataDrinks.strInstructions }</p>
              <br />

              <h2>Recomendadas</h2>
              <div className="cards">
                <div className="scroller">
                  { meals.map((meal, index) => (
                    <div
                      key={ index }
                      className={
                        (index !== next && index !== next + 1)
                          ? 'card invisible'
                          : 'card'
                      }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <Link to={ `/comidas/${meal.idMeal}` }>
                        <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                        <h2
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { meal.strMeal }
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
                <Link to={ `/bebidas/${idDrink}/in-progress` }>
                  <button
                    className="start-recipe"
                    data-testid="start-recipe-btn"
                    type="button"
                    hidden={ isDone }
                  >
                    { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
                  </button>
                </Link>
                <Link to="/bebidas">
                  <button
                    className="back"
                    type="button"
                  >
                    Voltar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) }
    </div>
  );
}

export default DetalhesBebida;
