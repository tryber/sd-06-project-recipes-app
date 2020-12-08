import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import { getRecipesMealsApi } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function DrinkDetails() {
  const [loading, setLoading] = useState(true);
  const [btnDoneRecipe, setBtnDoneRecipe] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [urlWasCopyToClipboard, seturlWasCopyToClipboard] = useState(false);
  const { recipeDrink, setRecipeDrink, recommendedMeals,
    setRecommendedMeals } = useContext(MealsContext);
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
    console.log(isFavorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      if (!isFavorite) {
        const newFavoriteRecipe = {
          id: recipeDrink.idDrink,
          type: 'bebida',
          area: '',
          category: recipeDrink.strCategory,
          alcoholicOrNot: recipeDrink.strAlcoholic,
          name: recipeDrink.strDrink,
          image: recipeDrink.strDrinkThumb,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      } else {
        const arrayFavoriteRecipe = favoriteRecipes.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      }
    }
  }

  useEffect(() => {
    async function fetchDatas() {
      // Verifica os detalhes da receita por id para
      const myRecipe = await getRecipeDrinkByIdApi(id);

      // Verifica receitas recomendadas
      const inditialIndex = 0;
      const quantityRecipes = 6;
      const resultRecommendedMeals = await getRecipesMealsApi();
      const myRecommendedMeals = resultRecommendedMeals
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
        const idsRecipesInProgress = Object.keys(recipesInProgress.cocktails);
        if (idsRecipesInProgress.includes(id)) {
          textBtnDoneRecipe = 'Continuar Receita';
        }
      }

      // Verifica se é uma receita favorita
      const myFavorite = verifyFavoriteRecipe();

      setIsFavorite(myFavorite);
      setBtnDoneRecipe(textBtnDoneRecipe);
      setRecommendedMeals(myRecommendedMeals);
      setRecipeDrink(myRecipe[0]);
      setLoading(false);
    }
    setLoading(true);
    fetchDatas();
  }, []);

  function getIngredients() {
    const inicio = 1;
    const fim = 15;
    let ingredients = [];
    for (let i = inicio; i <= fim; i += 1) {
      if (recipeDrink[`strIngredient${i}`] !== ''
        && recipeDrink[`strIngredient${i}`] !== null) {
        ingredients = [...ingredients,
          { ingredient: recipeDrink[`strIngredient${i}`],
            measure: recipeDrink[`strMeasure${i}`],
            checkbox: false,
          }];
      }
    }
    return ingredients;
  }

  // function updateRecipeInProgress() {
  //   const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   recipesInProgress.cocktails[id] = [];
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
          src={ recipeDrink.strDrinkThumb }
        />
      </div>
    );
  }

  function titleDatail() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeDrink.strDrink }</h2>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            className="app-button-transparent"
            onClick={ copyToClipboard }
          >
            <img src={ shareIcon } alt="Profile" />
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
        <h4 data-testid="recipe-category">{ recipeDrink.strAlcoholic }</h4>
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
        <p data-testid="instructions">{ recipeDrink.strInstructions }</p>
      </div>
    );
  }

  function showItemCarousel(index) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="d-block w-100"
          src={ recommendedMeals[index].strMealThumb }
          alt="Receitas recomendadas"
        />
        <h6>{ recommendedMeals[index].strCategory }</h6>
        <h4
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendedMeals[index].strMeal }
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
          <Link to={ `/bebidas/${id}/in-progress` }>
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
    (!recipeDrink || loading)
      ? <h5>Loading...</h5>
      : (
        <div>
          { imgDetail() }
          { titleDatail() }
          { categoryDetail() }
          { ingredientsDetail() }
          { instructionsDetail() }
          { recommendedDetail() }
          { buttonDetail() }
        </div>
      ));
}

export default DrinkDetails;
