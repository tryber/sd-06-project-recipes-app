import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import YouTube from 'react-youtube';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import { getRecipeDrinksApi } from '../services/drinksAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function MealDetails() {
  const [loading, setLoading] = useState(true);
  const [btnDoneRecipe, setBtnDoneRecipe] = useState('Iniciar Receita');
  const [isFavorite, setIsFavorite] = useState(false);
  const [urlWasCopyToClipboard, seturlWasCopyToClipboard] = useState(false);
  const { recipeMeal, setRecipeMeal, recommendedDrinks,
    setRecommendedDrinks } = useContext(MealsContext);
  const { id } = useParams(); // retorna o paramentro que está na rota
  const valorZero = 0;
  const valorUm = 1;
  const valorDois = 2;
  const valorTres = 3;
  const valorQuatro = 4;
  const valorCinco = 5;

  function verifyFavoriteRecipe() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const indexRecipe = favoriteRecipes.findIndex((item) => item.id === id);
      if (indexRecipe >= valorZero) {
        return true;
      }
    }
    return false;
  }

  function FavoriteRecipeClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      if (!isFavorite) {
        console.log('if', !isFavorite);
        const newFavoriteRecipe = {
          id: recipeMeal.idMeal,
          type: 'comida',
          area: recipeMeal.strArea,
          category: recipeMeal.strCategory,
          alcoholicOrNot: '',
          name: recipeMeal.strMeal,
          image: recipeMeal.strMealThumb,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      } else {
        const arrayFavoriteRecipe = favoriteRecipes.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      }
      console.log(isFavorite);
    }
  }

  useEffect(() => {
    async function fetchData() {
      // Verifica os detalhes da receita por id para
      const myRecipe = await getRecipeMealByIdApi(id);

      // Verifica receitas recomendadas
      const inditialIndex = 0;
      const quantityRecipes = 6;
      const resultRecommendedDrinks = await getRecipeDrinksApi();
      const myRecommendedDrinks = resultRecommendedDrinks
        .slice(inditialIndex, quantityRecipes);

      // Verifica se receita já foi iniciada ou concluída
      let textBtnDoneRecipe = 'Iniciar Receita';
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes !== null) {
        const indexDoneRecipe = doneRecipes.findIndex((item) => item.id === id);
        if (indexDoneRecipe >= valorZero
          && doneRecipes[indexDoneRecipe].doneDate !== '') {
          textBtnDoneRecipe = 'Receita Finalizada';
        }
      }
      const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (recipesInProgress !== null) {
        const idsRecipesInProgress = Object.keys(recipesInProgress.meals);
        if (idsRecipesInProgress.includes(id)) {
          textBtnDoneRecipe = 'Continuar Receita';
        }
      }

      // Verifica se é uma receita favorita
      const myFavorite = verifyFavoriteRecipe();

      setIsFavorite(myFavorite);
      setBtnDoneRecipe(textBtnDoneRecipe);
      setRecommendedDrinks(myRecommendedDrinks);
      setRecipeMeal(myRecipe[0]);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  function getIngredients() {
    const inicio = 1;
    const fim = 20;
    let ingredients = [];
    for (let i = inicio; i <= fim; i += 1) {
      if (recipeMeal[`strIngredient${i}`] !== ''
        && recipeMeal[`strIngredient${i}`] !== null) {
        ingredients = [...ingredients,
          { ingredient: recipeMeal[`strIngredient${i}`],
            measure: recipeMeal[`strMeasure${i}`],
            checkbox: false,
          }];
      }
    }
    return ingredients;
  }

  const optsYoutube = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 2,
    },
  };

  function getIdYoutube() {
    const idYoutube = recipeMeal.strYoutube.split('watch?v=')[1];
    return idYoutube;
  }

  // function updateRecipeInProgress() {
  //   const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   recipesInProgress.meals[id] = [];
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  // }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    seturlWasCopyToClipboard(true);
  }

  function imgDetail() {
    return (
      <div className="img-container">
        <img
          className="detail-img"
          alt="detail"
          data-testid="recipe-photo"
          src={ recipeMeal.strMealThumb }
        />
      </div>
    );
  }

  function titleDatail() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeMeal.strMeal }</h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            className="app-button-transparent"
            onClick={ copyToClipboard }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            type="button"
            className="app-button-transparent"
            onClick={ FavoriteRecipeClick }
          >
            <img
              src={ isFavorite ? blackIcon : whiteIcon }
              alt="Favorite"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        { urlWasCopyToClipboard ? <h6>Link copiado!</h6> : null }
      </div>
    );
  }

  function categoryDetail() {
    return (
      <div>
        <h4 data-testid="recipe-category">{ recipeMeal.strCategory }</h4>
      </div>
    );
  }

  function ingredientsDetail() {
    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `- ${item.ingredient} (${item.measure})` }
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function instructionsDetail() {
    return (
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipeMeal.strInstructions }</p>
      </div>
    );
  }

  function videoDetail() {
    return (
      <div data-testid="video">
        <h3>Video</h3>
        <YouTube
          videoId={ recipeMeal.strYoutube !== undefined ? getIdYoutube() : null }
          opts={ optsYoutube }
          onReady={ (e) => e.target.pauseVideo() }
        />
      </div>
    );
  }

  function showItemCarousel(index) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="d-block w-100"
          src={ recommendedDrinks[index].strDrinkThumb }
          alt="Receitas recomendadas"
        />
        <h6>{ recommendedDrinks[index].strAlcoholic }</h6>
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendedDrinks[index].strDrink }
        </h4>
      </div>
    );
  }

  function recommendedDetail() {
    return (
      <div>
        <h3>Recommended</h3>
        <Carousel>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(valorZero) }
              { showItemCarousel(valorUm) }
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(valorDois) }
              { showItemCarousel(valorTres) }
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              { showItemCarousel(valorQuatro) }
              { showItemCarousel(valorCinco) }
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

  function buttonDetail() {
    return (
      <div>
        { btnDoneRecipe !== 'Receita Finalizada' && (
          <Link to={ `/comidas/${id}/in-progress` }>
            <Button
              className="btn-iniciar-receita"
              type="button"
              data-testid="start-recipe-btn"
              variant="success"
              size="lg"
              block
              // onClick={ updateRecipeInProgress }
            >
              { btnDoneRecipe }
            </Button>
          </Link>)}
      </div>
    );
  }

  return (
    (!recipeMeal || loading)
      ? <h5>Loading...</h5>
      : (
        <div>
          { imgDetail() }
          { titleDatail() }
          { categoryDetail() }
          { ingredientsDetail() }
          { instructionsDetail() }
          { videoDetail() }
          { recommendedDetail() }
          { buttonDetail() }
        </div>
      ));
}

export default MealDetails;
