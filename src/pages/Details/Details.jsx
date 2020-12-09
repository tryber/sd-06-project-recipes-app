import React, { useEffect, useContext, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { foodDetails, drinkDetails, getDrinksApi, getMealsAPI } from '../../services/API';
import Context from '../../context/Context';
import shareBtn from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.css';

const Details = (props) => {
  const { location } = props;
  const { pathname } = location;
  const [startRecipeBtn, setStartRecipeBtn] = useState(true);
  const [recipeBtnText, setRecipeBtnText] = useState('Start recipe');
  const [messageToggle, setMessageToggle] = useState(false);
  const [heartIcon, setHeartIcon] = useState('');
  const {
    recomendations,
    setRecomendations,
    details,
    setdetails,
  } = useContext(Context);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const idDetails = id;
  const { path } = match;
  const pop = path;
  const cinco = 5;

  // const handleClick = (e, setdisableButton) => {
  //   e.preventDefault();
  //   let savedRecipes = [];
  //   savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const { idDrink } = details;
  //   const { idMeal } = details;
  //   if (savedRecipes) {
  //     savedRecipes.forEach((savedRecipe) => {
  //       if (savedRecipe.id === idDrink || savedRecipe.id === idMeal) {
  //         setdisableButton('hidden');
  //         return true;
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    if (pop === '/comidas/:id') {
      foodDetails(idDetails).then((data) => {
        setdetails(data[0]);
      });
      getDrinksApi().then((index) => {
        setRecomendations(index);
      });
    } else {
      drinkDetails(idDetails).then((data) => {
        setdetails(data[0]);
      });
      getMealsAPI().then((index) => {
        setRecomendations(index);
      });
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.some((recipe) => {
        if (id === recipe.id) {
          return setStartRecipeBtn(false);
        }
        return undefined;
      });
    }
    return setRecipeBtnText('Start recipe');
  }, [id, idDetails, pop, setRecomendations, setdetails]);

  function getUrl() {
    let url = 'comidas';
    if (details.strDrink) {
      url = 'bebidas';
    }
    return url;
  }

  const renderRecipeBtn = () => (
    <button
      className="btn btn-small btn-active recomendation-size"
      type="button"
      data-testid="start-recipe-btn"
    >
      <Link to={ `/${getUrl()}/${id}/in-progress` }>
        {recipeBtnText}
      </Link>
    </button>
  );

  const showMessage = () => {
    const TWO_SECONDS = 2000;
    setMessageToggle(true);
    setTimeout(() => {
      setMessageToggle(false);
    }, TWO_SECONDS);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    showMessage();
  };

  useEffect(() => {
    let isFav = false;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      isFav = favoriteRecipes.some((r) => r.id === id);
    }
    return isFav ? setHeartIcon(blackHeartIcon) : setHeartIcon(whiteHeartIcon);
  }, [id]);

  function getRecipeValues(value) {
    const { idMeal, strAlcoholic } = details;

    switch (value) {
    case 'type':
      return (idMeal) ? 'comida' : 'bebida';
    case 'alcohol':
      return (strAlcoholic) ? 'Alcoholic' : '';
    default:
      return '';
    }
  }

  function handleFavorite() {
    const {
      idMeal,
      idDrink,
      strCategory: category,
      strMeal,
      strDrink,
      strArea,
      strMealThumb,
      strDrinkThumb,
    } = details;

    const newFavRecipe = {
      id: idMeal || idDrink,
      type: getRecipeValues('type'),
      area: strArea || '',
      category,
      alcoholicOrNot: getRecipeValues('alcohol'),
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };

    const oldFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let alreadyFavorited = false;
    if (oldFavRecipes) {
      alreadyFavorited = oldFavRecipes.find((r) => newFavRecipe.id === r.id);
    }
    if (oldFavRecipes && !alreadyFavorited) {
      const updatedRecipes = [...oldFavRecipes, newFavRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      return setHeartIcon(blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
    return setHeartIcon(blackHeartIcon);
  }

  const unfavoriteRecipe = () => {
    const oldFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (oldFavRecipes) {
      const updatedRecipes = oldFavRecipes.filter((r) => r.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    }
    return setHeartIcon(whiteHeartIcon);
  };

  function toggleFavorite() {
    if (heartIcon === blackHeartIcon) {
      return unfavoriteRecipe();
    }
    return handleFavorite();
  }

  return (
    <div>
      <Header pathname={ pathname } />
      <div className="container-details">
        <img
          className="image-details"
          src={ details.strDrinkThumb || details.strMealThumb }
          data-testid="recipe-photo"
          alt={ details.strMeal || details.strDrink }
        />

        <div className="buttons-details">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyUrlToClipboard() }
          >
            <img src={ shareBtn } alt="share" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ heartIcon }
            onClick={ () => toggleFavorite() }
          >
            <img
              alt="heart icon"
              src={ heartIcon }
            />
          </button>
        </div>
        {messageToggle && <p className="copy-message">Link copied!</p>}
        <h1
          className="title-details"
          data-testid="recipe-title"
        >
          { details.strDrink || details.strMeal }
        </h1>

        <div className="category-details">
          <text
            data-testid="recipe-category"
          >
            { details.strAlcoholic }
            { details.strCategory }
          </text>
        </div>

        <h3 className="ingredient-details">Ingredientes:</h3>
        <ul>
          {
            Object.keys(details)
              .filter((keys) => keys.includes('Ingredient'))
              .map((ingredient, index) => {
                if (details[ingredient] !== '' && details[ingredient] !== null) {
                  const measure = Object.keys(details)
                    .filter((keys) => keys.includes('Measure'));
                  const measureIndex = measure[index];
                  return (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${details[ingredient]} - ${details[measureIndex]} `}
                    </li>
                  );
                }
                return '';
              })
          }
        </ul>

        <h3 className="ingredient-details">Instructions:</h3>
        <div className="instructions-details">
          <text
            data-testid="instructions"
          >
            { details.strInstructions }
          </text>
        </div>
        { details.strYoutube && (
          <div className="video-details" data-testid="video">
            <iframe
              width="320"
              height="180"
              title="frame"
              src={
                details.strYoutube
                && details.strYoutube.replace('watch?v=', 'embed/')
              }
              frameBorder="0"
            />
          </div>
        ) }
        <h3 className="ingredient-details">Recomendations:</h3>
        <div className="recomendation-container">
          <Carousel
            showArrows={ true }
            showStatus={ false }
            infiniteLoop={ true }
            autoPlay={ true }
            width={ '320px' }
            interval={ 2000 }
            showThumbs={ false }
            stopOnHover={ false }
            centerMode={ false }
          >
            {recomendations.filter((_, indx) => indx <= cinco)
              .map((recipe, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ recipe.idMeal || recipe.idDrink }
                  className="recomendation-card"
                >
                  <img
                    className="image-recomendation"
                    src={ recipe.strMealThumb || recipe.strDrinkThumb }
                    alt={ recipe.idMeal || recipe.idDrink }
                  />
                  <p className="legend" data-testid={ `${index}-recomendation-title` }>
                    { recipe.strMeal || recipe.strDrink }
                  </p>
                </div>
              ))}
          </Carousel>
        </div>
        <div className="recomendation-buttons">
          {startRecipeBtn && renderRecipeBtn()}
        </div>
        {/* <button
          className="continue-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          Continuar Receita
        </button> */}
      </div>
      <div className="container-footer">
        <Footer parthname={ pathname } />
      </div>
    </div>
  );
};
Details.propTypes = {
  id: PropTypes.shape().isRequired,
  path: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Details;
