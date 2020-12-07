import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import { fetchAPIDrinks, fetchAPIRecipes } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/details.css';

function RecipeDetails() {
  const {
    recipes,
    setRecipes,
    recipeStarted,
    setRecipeStart,
  } = useContext(ContextRecipes);
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [urlVideo, setUrlVideo] = useState('=');
  const location = useLocation().pathname;
  const history = useHistory();
  const { idRecipe } = useParams();
  const localStorageFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const localStorageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const fetchDetailedRecipe = async () => {
    if (location.includes('comidas')) {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJSON = await data.json();
      const mealRecipe = responseJSON.meals;
      setSingleRecipe(mealRecipe[0]);
      const recipesRecomend = await fetchAPIDrinks('name', '');
      setRecipes(recipesRecomend);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === mealRecipe[0].idMeal) {
            setFavoriteRecipe(true);
          }
        });
      }

      if (localStorageProgress && localStorageProgress.meals) {
        Object.keys(localStorageProgress.meals).forEach((item) => {
          if (item === mealRecipe[0].idMeal) {
            setRecipeStart(true);
          }
        });
      }

      const video = mealRecipe[0].strYoutube.split('=')[1];
      setUrlVideo(video);
    } else {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      const responseJSON = await data.json();
      const drinkRecipe = responseJSON.drinks;
      setSingleRecipe(drinkRecipe[0]);
      const recipesRecomend = await fetchAPIRecipes('name', '');
      setRecipes(recipesRecomend);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === drinkRecipe[0].idDrink) {
            setFavoriteRecipe(true);
          }
        });
      }

      if (localStorageProgress && localStorageProgress.cocktails) {
        Object.keys(localStorageProgress.cocktails).forEach((item) => {
          if (item === drinkRecipe[0].idDrink) {
            setRecipeStart(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    setFetching(true);
    fetchDetailedRecipe();
    setFetching(false);
  }, []);

  const handleFavoriteRecipes = () => {
    let newFavRecipe = {};
    if (location.includes('comidas')) {
      newFavRecipe = {
        id: singleRecipe.idMeal,
        type: 'comida',
        area: singleRecipe.strArea,
        category: singleRecipe.strCategory,
        alcoholicOrNot: '',
        name: singleRecipe.strMeal,
        image: singleRecipe.strMealThumb,
      };
    } else {
      newFavRecipe = {
        id: singleRecipe.idDrink,
        type: 'bebida',
        area: '',
        category: singleRecipe.strCategory,
        alcoholicOrNot: singleRecipe.strAlcoholic,
        name: singleRecipe.strDrink,
        image: singleRecipe.strDrinkThumb,
      };
    }
    if (!favoriteRecipe) {
      if (!localStorageFavs) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...localStorageFavs, newFavRecipe]));
      }
      setFavoriteRecipe(true);
    } else {
      localStorageFavs.forEach((item, index) => {
        if (item.id === newFavRecipe.id) {
          localStorageFavs.splice(index, 1);
          localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavs));
        }
      });
      setFavoriteRecipe(false);
    }
  };

  const renderIngredients = (recipeData) => {
    const arrayIngredients = [];
    const maxIngredients = 20;

    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipeData[`strIngredient${index}`] !== ''
      && recipeData[`strIngredient${index}`] !== null
      && recipeData[`strIngredient${index}`] !== undefined
      ) {
        arrayIngredients.push({
          ingredient: recipeData[`strIngredient${index}`],
          measure: recipeData[`strMeasure${index}`],
        });
      }
    }
    return arrayIngredients;
  };

  const maxCards = 6;
  const allIngredients = renderIngredients(singleRecipe);

  const handleProgressRecipes = () => {
    if (!recipeStarted) {
      if (location.includes('comidas')) {
        if (!localStorageProgress) {
          localStorage.setItem('inProgressRecipes',
            JSON.stringify({ meals: { [singleRecipe.idMeal]: allIngredients } }));
        } else {
          localStorage.setItem('inProgressRecipes',
            JSON.stringify({ ...localStorageProgress,
              meals: { ...localStorageProgress.meals,
                [singleRecipe.idMeal]: allIngredients } }));
        }
      } else if (!localStorageProgress) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: { [singleRecipe.idDrink]: allIngredients } }));
      } else {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ ...localStorageProgress,
            cocktails: { ...localStorageProgress.cocktails,
              [singleRecipe.idDrink]: allIngredients } }));
      }
    }
    history.push(`${location}/in-progress`);
  };

  const handleShareIcon = () => {
    const zero = 0;
    const menosUm = -1;
    let fullPath = '';
    if (location.substr(location.length - 1) === '/') {
      fullPath = `http://localhost:3000${location.slice(zero, menosUm)}`;
    } else {
      fullPath = `http://localhost:3000${location}`;
    }
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.icons-area').appendChild(linkCopy);
  };

  const handleRecomendatioNRecipes = async ({ target }) => {
    if (target.alt === 'food') {
      console.log(target.alt);
      history.push(`/comidas/${target.id}`);
    } else {
      console.log(target.alt);
      history.push(`/bebidas/${target.id}`);
    }
  };

  return (
    <div className="details-card">
      {(isFetching) ? <h2>Carregando receita...</h2>
        : (
          <div>
            {(location.includes('comidas')) ? (
              <div className="details-container">
                <img
                  src={ singleRecipe.strMealThumb }
                  className="img-card-details"
                  alt="food"
                  data-testid="recipe-photo"
                  // className="box-card"
                  // width="200px"
                />
                <h3
                  data-testid="recipe-title"
                  className="title"
                >
                  { singleRecipe.strMeal }

                </h3>
                <div className="sub-title">
                  <h4 data-testid="recipe-category">{ singleRecipe.strCategory }</h4>
                  <section className="icons-area">
                    <img
                      src={ shareIcon }
                      alt="Share"
                      data-testid="share-btn"
                      id="share-btn"
                      onClick={ handleShareIcon }
                      aria-hidden="true"
                      className="share-btn"
                    />
                    <img
                      src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                      alt="Favorite"
                      data-testid="favorite-btn"
                      onClick={ handleFavoriteRecipes }
                      aria-hidden="true"
                    />
                  </section>

                </div>
                <h5 className="section-title"> Ingredients </h5>
                <section className="ingredients-area">
                  {allIngredients.map((ingredient, index) => (
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {`- ${ingredient.ingredient}: ${(ingredient.measure === null)
                        ? 'a gosto'
                        : ingredient.measure}`}
                    </p>
                  ))}
                </section>
                <h5 className="section-title"> Instructions </h5>
                <p
                  data-testid="instructions"
                  className="ingredients-area"
                >
                  { singleRecipe.strInstructions }

                </p>
                {/* <video data-testid="video" width="320" height="240">
                  <track
                    default
                    kind="captions"
                    srcLang="pt-br"
                  />
                  <source src={ singleRecipe.strYoutube } />
                </video> */}
                <div className="video-div">
                  <iframe
                    data-testid="video"
                    title="recipe-video"
                    src={ `https://www.youtube.com/embed/${urlVideo}` }
                    frameBorder="0"
                    allow="accelerometer;autoplay;
                    clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <section>
                  <h5 className="section-title"> Recomendações: </h5>
                  <div className="container-card">
                    {recipes.map((recipe, index) => (
                      <div
                        key={ index }
                        className="unit-card"
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <h4
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { recipe.strDrink }
                        </h4>
                        <span>{ recipe.strAlcoholic }</span>
                        <img
                          src={ recipe.strDrinkThumb }
                          alt="drink"
                          width="90%"
                          id={ recipe.idDrink }
                          onClick={ handleRecomendatioNRecipes }
                          aria-hidden="true"
                        />
                      </div>
                    )).filter((_, index) => index < maxCards)}
                  </div>
                </section>
              </div>
            ) : (
              <div className="details-container">
                <img
                  // className="img-grink"
                  className="img-card-details"
                  src={ singleRecipe.strDrinkThumb }
                  alt="drink"
                  data-testid="recipe-photo"
                  width="200px"
                />
                <h3
                  data-testid="recipe-title"
                  className="title"
                >
                  { singleRecipe.strDrink }

                </h3>
                <div className="sub-title">
                  <h4 data-testid="recipe-category">{ singleRecipe.strAlcoholic }</h4>
                  <section className="icons-area">
                    <img
                      src={ shareIcon }
                      alt="Share"
                      data-testid="share-btn"
                      id="share-btn"
                      onClick={ handleShareIcon }
                      aria-hidden="true"
                      className="share-btn"
                    />
                    <img
                      src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                      alt="Favorite"
                      data-testid="favorite-btn"
                      onClick={ handleFavoriteRecipes }
                      aria-hidden="true"
                    />
                  </section>
                </div>
                <h5 className="section-title"> Ingredients </h5>
                <section className="ingredients-area">
                  {allIngredients.map((ingredient, index) => (
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {`${ingredient.ingredient}: ${(ingredient.measure === null)
                        ? 'a gosto'
                        : ingredient.measure}`}
                    </p>
                  ))}
                </section>
                <h5 className="section-title"> Instructions </h5>
                <p
                  data-testid="instructions"
                  className="ingredients-area"
                >
                  { singleRecipe.strInstructions }

                </p>
                <section>
                  <h5 className="section-title"> Recomendações: </h5>
                  <div className="container-card">
                    {recipes.map((recipe, index) => (
                      <div
                        key={ index }
                        className="unit-card"
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <h4
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { recipe.strMeal }
                        </h4>
                        <span>{ recipe.strCategory }</span>
                        <img
                          className="recipe-food"
                          src={ recipe.strMealThumb }
                          alt="food"
                          id={ recipe.idMeal }
                          width="90%"
                          onClick={ handleRecomendatioNRecipes }
                          aria-hidden="true"
                        />
                      </div>
                    )).filter((_, index) => index < maxCards)}
                  </div>
                </section>
              </div>
            )}
            <section>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn btn-light btn-lg btn-block btn-init"
                onClick={ handleProgressRecipes }
              >
                {recipeStarted ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            </section>
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
