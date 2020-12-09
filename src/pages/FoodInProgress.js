import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//  import { CopyToClipboard } from 'react-copy-to-clipboard';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../App.css';

// const arrayClick = []; // popular com id dos clicks.
export default function FoodInProgress() {
  const { state, setState } = useContext(RecipesContext);
  const params = useParams();
  const [clickIngred, setClickIngred] = useState([]);// estado controle checked.
  const [isfavorite, setIsFavorite] = useState(false); // estado controlar favoritar.
  const [inputMark, setInputMark] = useState('');// estado controlar className.
  const [isShared, setIsShared] = useState(false);// estado controlar class compartilhar.
  const [isDesible, setDesible] = useState(true);// estado controlar diseble do btn finalizar.
  const numMagic = 1;
  const [count, setCount] = useState(numMagic);
  // função clipboard
  const handleShareButton = () => {
    try {
      const copyText = window.location.href.replace('/in-progress', '');
      console.log('copyText', copyText);
      window.navigator.clipboard.writeText(copyText);
      window.navigator.clipboard.writeText(copyText);
      setIsShared(!isShared);
    } catch (error) {
      console.log(error);
    }
  };

  // função controlar o componente ingrediente.
  const checked = (even) => {
    setCount(count + 1);
    if (localStorage.ingredients) {
      const ingredClicks = JSON.parse(
        localStorage
          .getItem('ingredients'),
      );
      console.log('count', count);
      console.log('diseble', ingredClicks);
      if (count === ingredClicks) {
        setDesible(false);
      }
    }
    const click = (Number(even.target.id));
    setInputMark(click);
    // controlar o componente checkbox
    const currentItem = (clickIngred.includes(click))
      ? clickIngred.filter((el) => el !== click) : [...clickIngred, click];
    setClickIngred(currentItem);
    // salvar no localStorage.
    const { idMeal } = state[0];
    const initial = {
      cocktails: {},
    };
    const currentStorage = JSON.parse(
      localStorage
        .getItem('inProgressRecipes'),
    ) || initial;
    const newStorage = {
      ...currentStorage,
      meals: {
        ...currentStorage.meals,
        ...{ [idMeal]: currentItem },
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  // função para renderizar os ingreditentes.
  const renderIngredients = () => {
    const ingredientsArray = [];
    const maxPosition = 20;
    for (let i = 1; maxPosition >= i; i += 1) {
      if (state[0][`strIngredient${i}`] === '') {
        break;
      }
      ingredientsArray.push(state[0][`strIngredient${i}`]);
    }
    localStorage.setItem('ingredients', JSON.stringify(ingredientsArray.length));
    return ingredientsArray.map((el, idx) => (
      <label
        key={ idx }
        htmlFor={ idx }
        className={ inputMark === idx ? 'checked' : '1' }
        data-testid={ `${idx}-ingredient-step` }
      >
        { el }
        <input
          id={ idx }
          checked={ clickIngred.includes(idx) }
          type="checkbox"
          onChange={ (event) => checked(event) }
        />
      </label>
    ));
  };

  // carregar API
  useEffect(() => {
    fetchApiFood('6', setState, String(params.id));
    if (localStorage.inProgressRecipes) {
      const getStorage = JSON.parse(
        localStorage
          .getItem('inProgressRecipes'),
      );
      if (getStorage.meals[params.id]) {
        setClickIngred(getStorage.meals[params.id]);
      }
    }
    if (localStorage.favoriteRecipes) {
      const getFavorite = JSON.parse(
        localStorage
          .getItem('favoriteRecipes'),
      );
      const start = 0;
      for (let i = start; i < getFavorite.length; i += 1) {
        if (getFavorite[i].id === params.id) {
          setIsFavorite(!isfavorite);
        }
      }
    }
  }, []);

  // função para favoritar
  const favoritar = () => {
    if (localStorage.favoriteRecipes) {
      const favObj = {
        favoriteRecipes: [{
          id: state[0].idMeal,
          type: 'comida',
          area: state[0].strArea,
          category: state[0].strCategory,
          alcoholicOrNot: '',
          name: state[0].strMeal,
          image: state[0].strMealThumb,
        }],
      };
      const currentFavoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      ) || [];
      currentFavoriteRecipes.push(favObj.favoriteRecipes[0]);
      currentFavoriteRecipes.concat(JSON.parse(localStorage.getItem('favoriteRecipes')));
      localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavoriteRecipes));
    } else {
      const favObj = {
        favoriteRecipes: [{
          id: state[0].idMeal,
          type: 'comida',
          area: state[0].strArea,
          category: state[0].strCategory,
          alcoholicOrNot: '',
          name: state[0].strMeal,
          image: state[0].strMealThumb,
        }],
      };
      console.log('fav', favObj.favoriteRecipes[0]);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favObj.favoriteRecipes));
    }
    setIsFavorite(!isfavorite);
  };

  // funçaõ pegar dados e passar para localStorage.
  const getFoodData = () => {
    const recipeData = {
      id: state[0].idMeal,
      type: 'comida',
      area: state[0].strArea,
      category: state[0].strCategory,
      alcoholicOrNot: '',
      name: state[0].strMeal,
      image: state[0].strMealThumb,
    };
    const initail = {
      cocktailsDone: {},
    };
    const currentRecipe = JSON.parse(
      localStorage
        .getItem('recipesDone'),
    ) || initail;
    const newRecipeDone = {
      ...currentRecipe,
      mealDone: {
        ...currentRecipe.mealDone,
        ...{ [state[0].idMeal]: recipeData },
      },
    };
    localStorage.setItem('recipesDone', JSON.stringify(newRecipeDone));
  };

  return (
    <div>
      {state.map((el, idx) => (
        <div key={ idx }>
          <img
            key={ idx }
            src={ el.strMealThumb }
            alt="food-pic"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{el.strMeal}</h1>
          <h3 data-testid="recipe-category">{el.strCategory}</h3>
          <content>
            { state.length > idx ? renderIngredients() : console.log('fora do ar')}
          </content>
          <content>
            <h2>Instructions</h2>
            <p data-testid="instructions">{el.strInstructions}</p>
          </content>
          <span className={ isShared ? 'show' : 'hide' }>Link copiado!</span>
        </div>
      )) }
      <input
        type="image"
        src={ ShareIcon }
        onClick={ () => handleShareButton() }
        alt="foto-compratilhar"
        data-testid="share-btn"
      />
      { isfavorite ? <input
        type="image"
        src={ blackHeartIcon }
        alt="foto=favorito"
        data-testid="favorite-btn"
        onClick={ () => favoritar() }
      /> : <input
        type="image"
        src={ whiteHeartIcon }
        alt="foto=favorito"
        data-testid="favorite-btn"
        onClick={ () => favoritar() }
      /> }
      <a
        href="/receitas-feitas"
      >
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDesible }
          onClick={ getFoodData }
        >
          Finalizar
        </button>
      </a>
    </div>
  );
}
