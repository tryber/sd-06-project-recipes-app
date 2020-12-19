import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';
import '../style/Detalhes.css';

function DetalhesBebida() {
  const timeoutTextCopy = 3000;
  const { data } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];
  const SEIS = 6;
  const { location: { pathname } } = history;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    if (JSON.parse(localStorage.inProgressRecipes).cocktails) {
      const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).cocktails);
      continuar = ids.includes(idDrink);
    }
  }

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setIsFavorite(true);
    }
  }, []);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: dataDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: dataDrinks.strCategory,
        alcoholicOrNot: dataDrinks.strAlcoholic,
        name: dataDrinks.strDrink,
        image: dataDrinks.strDrinkThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div className="container-details">
            <img
              data-testid="recipe-photo"
              src={ dataDrinks.strDrinkThumb }
              alt={ dataDrinks.strDrink }
            />
            <div className="div-header">
              <div className="div-title">
                <h1 data-testid="recipe-title">{ dataDrinks.strDrink }</h1>
                <p data-testid="recipe-category">{ dataDrinks.strAlcoholic }</p>
              </div>
              <div className="div-icon">
                <span>
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
                </span>
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
                  {
                    data[0] && data[0].meals
                      .filter((_, index) => index < SEIS)
                      .map(({ strMeal, strMealThumb }, index) => (
                        <div
                          className="card"
                          key={ strMeal }
                          data-testid={ `${index}-recomendation-card` }
                        >
                          <img src={ strMealThumb } alt={ strMeal } />
                          <h2
                            data-testid={ `${index}-recomendation-title` }
                          >
                            { strMeal }
                          </h2>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
            <Link to={ `/bebidas/${idDrink}/in-progress` }>
              <button
                className="start-recipe"
                data-testid="start-recipe-btn"
                type="button"
              >
                { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default DetalhesBebida;
