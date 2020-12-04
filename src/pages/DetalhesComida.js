import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';
import '../style/Detalhes.css';

function DetalhesComida() {
  const timeoutTextCopy = 3000;
  const { data } = useContext(RecipesContext);
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataMeal, setDataMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const idMeal = history.location.pathname.split('/')[2];
  const SEIS = 6;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    if (JSON.parse(localStorage.inProgressRecipes).meals) {
      const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).meals);
      continuar = ids.includes(idMeal);
    }
  }

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const responseJson = await response.json();
      setDataMeal(responseJson.meals[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idMeal]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idMeal) {
          setIsFavorite(true);
        }
      });
    }
  }, []);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: dataMeal.idMeal,
        type: 'comida',
        area: dataMeal.strArea,
        category: dataMeal.strCategory,
        alcoholicOrNot: '',
        name: dataMeal.strMeal,
        image: dataMeal.strMealThumb,
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
              src={ dataMeal.strMealThumb }
              alt={ dataMeal.strMeal }
            />
            <h1 data-testid="recipe-title">{ dataMeal.strMeal }</h1>
            <p data-testid="recipe-category">{ dataMeal.strCategory }</p>
            <span>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => handleCopy(`/comidas/${idMeal}`) }
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
            <video data-testid="video" width="300" height="250" controls>
              <source src={ dataMeal.strYoutube } type="video/mp4" />
              <track src="" kind="captions" />
            </video>

            <h2>Recomendadas</h2>
            <div className="cards">
              <div className="scroller">
                {
                  data[1] && data[1].drinks
                    .filter((_, index) => index < SEIS)
                    .map(({ strDrink, strDrinkThumb }, index) => (
                      <div
                        className="card"
                        key={ strDrink }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <img src={ strDrinkThumb } alt={ strDrink } />
                        <h2
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { strDrink }
                        </h2>
                      </div>
                    ))
                }
              </div>
            </div>

            <Link to={ `/comidas/${idMeal}/in-progress` }>
              <button
                className="start-recipe"
                data-testid="start-recipe-btn"
                type="button"
              >
                { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>) }
    </div>
  );
}

export default DetalhesComida;
