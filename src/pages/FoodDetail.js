import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FavoriteButton from '../components/FavoriteButton';
import { addRecipeDetail } from '../redux/actions/searchRecipes';
import {
  filterMatchInKeys,
  modifyResponse,
  modifyResponseToFavoriteBtn,
} from '../helpers/assets';
import shareIcon from '../images/shareIcon.svg';
import '../css/details.css';

function FoodDetail(props) {
  const {
    match: { url, path, params: { id } },
    fetchId: { Comidas, Bebidas },
    dispatchRecipeDetail } = props;
  const [objResponse, setObjResponse] = useState({});
  const [ingredientsItem, setIngredientsItem] = useState([]);
  const [mesuresItem, setMesuresItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [shareMessege, setShareMessege] = useState('');
  // const [objectRecipe, setObjectRecipe] = useState({});
  const [favoriteResponseModified, setFavoriteResponseModified] = useState();
  // const [loading, setLoading] = useState(true);

  const getIngredientsAndMesures = (object) => {
    const ingredients = filterMatchInKeys(/strIngredient/i, object);
    const showIngredients = ingredients.map((ingred) => object[ingred])
      .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
    setIngredientsItem(showIngredients);
    const mesures = filterMatchInKeys(/strMeasure/i, object);
    const showMesures = mesures.map((mesu) => object[mesu])
      .filter((eachMesure) => eachMesure !== '' && eachMesure !== null);
    setMesuresItem(showMesures);
    localStorage.setItem('medidas', JSON.stringify({
      ingredients: showIngredients, medidas: showMesures,
    }));
  };

  const fetchRecipe = async () => {
    if (path === '/comidas/:id') {
      const recipeType = 'meals';
      const nameType = 'Meal';
      const name = 'comida';
      const changeCategory = 'strCategory';
      const response = await Comidas.idFood(id);
      console.log('detalhe do objeto', response);
      // setFavoriteRecipe(response);
      setObjResponse(modifyResponse(response, nameType, recipeType, changeCategory));
      setFavoriteResponseModified(modifyResponseToFavoriteBtn(
        response, nameType, recipeType, name,
      ));
      getIngredientsAndMesures(response.meals[0]);
      // console.log(setButtonImg, objectRecipe);
    }
    if (path === '/bebidas/:id') {
      const recipeType = 'drinks';
      const nameType = 'Drink';
      const name = 'bebida';
      const changeCategory = 'strAlcoholic';
      const response = await Bebidas.idDrink(id);
      // setObjectRecipe(response);
      setObjResponse(modifyResponse(response, nameType, recipeType, changeCategory));
      // const respostaDoObjeto = modifyResponse(
      //   response, nameType, recipeType, changeCategory,
      // );
      setFavoriteResponseModified(modifyResponseToFavoriteBtn(
        response, nameType, recipeType, changeCategory, name,
      ));
      // localStorage.setItem('objeto', JSON.stringify(respostaDoObjeto));
      getIngredientsAndMesures(response.drinks[0]);
    }
  };

  const filterRecomendation = (response) => {
    if (path === '/bebidas/:id') {
      const number = 5;
      const newObj = response.meals.filter((item, index) => index <= number);
      return newObj;
    }
    const number = 5;
    const newObj = response.drinks.filter((item, index) => index <= number);
    return newObj;
  };

  const randomName = (array) => {
    if (path === '/comidas/:id') {
      const nameType = 'Drink';
      const changeCategory = 'strAlcoholic';
      const arrayfiltered = array.map((element) => (
        {
          name: element[`str${nameType}`],
          category: element[changeCategory],
          img: element[`str${nameType}Thumb`],
        }
      ));
      return arrayfiltered;
    }
    if (path === '/bebidas/:id') {
      const nameType = 'Meal';
      const changeCategory = 'strCategory';
      const arrayfiltered = array.map((element) => (
        {
          name: element[`str${nameType}`],
          category: element[changeCategory],
          img: element[`str${nameType}Thumb`],
        }
      ));
      return arrayfiltered;
    }
  };

  const shareLinkButton = async () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setShareMessege('Link copiado!');
  };

  const handleClick = () => {
    const ingredientsAndMesures = {
      ingredients: ingredientsItem,
      mesures: mesuresItem,
    };
    dispatchRecipeDetail({ ...objResponse, ...ingredientsAndMesures });
    // localStorage.setItem('receita', JSON.stringify({...objResponse, ...ingredientsAndMesures}));
  };

  const fetchRecomendation = async () => {
    if (path === '/bebidas/:id') {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const getRecomendation = await fetch(URL);
      const response = await getRecomendation.json();
      console.log(response);
      if (response) {
        const filterResult = filterRecomendation(response);
        setRecomendation(randomName(filterResult));
      }
    } else {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const getRecomendation = await fetch(URL);
      const response = await getRecomendation.json();
      console.log(response);
      if (response) {
        const filterResult = filterRecomendation(response);
        setRecomendation(randomName(filterResult));
      }
    }
  };

  useEffect(() => {
    if (!fetchRecipe()) return <p>loading</p>;
    fetchRecipe();
    fetchRecomendation();
    // setFavoriteRecipe(objResponse)
  }, []);

  const showVideo = () => {
    if (path === '/bebidas/:id') {
      return '';
    }
    return (
      <video
        data-testid="video"
        controls
        src={ objResponse.video }
      >
        <track src={ objResponse.video } kind="captions" srcLang="en" />
      </video>
    );
  };
  return (
    <div>
      <img
        className="main-image"
        data-testid="recipe-photo"
        src={ objResponse.img }
        alt={ objResponse.title }
        width="150"
      />
      <h1 data-testid="recipe-title">{objResponse.title}</h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareLinkButton() }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <p>{shareMessege}</p>
      <FavoriteButton recipe={ favoriteResponseModified } id={ id } />
      <h4 data-testid="recipe-category">{objResponse.category}</h4>
      <ul>
        {ingredientsItem.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${item} - ${mesuresItem[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{objResponse.instruction}</p>
      {showVideo()}
      <ul className="recomendation-image">
        {recomendation
          .map((recipe, index) => (
            <li key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ recipe.img } alt={ recipe.name } width="160" />
              <h4>{recipe.category}</h4>
              <h1 data-testid={ `${index}-recomendation-title` }>{recipe.name}</h1>
            </li>
          ))}
      </ul>
      <Link
        to={ {
          pathname: `${url}/in-progress`,
          state: {
            ...objResponse,
            ingredients: ingredientsItem,
            mesures: mesuresItem,
            urlDetail: url,
          },
        } }
      >
        <button
          onClick={ () => handleClick() }
          data-testid="start-recipe-btn"
          className="button-position"
          type="button"
        >
          Iniciar Receita
        </button>
      </Link>

    </div>);
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipeDetail: (recipeDetail) => dispatch(addRecipeDetail(recipeDetail)),
});

const mapStateToProps = (state) => ({
  index: state.searchRecipes.recipes.results,
  fetchId: state.fetchmap,
});

FoodDetail.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.objectOf(PropTypes.object).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  fetchId: PropTypes.shape({
    Bebidas: PropTypes.objectOf(PropTypes.func).isRequired,
    Comidas: PropTypes.objectOf(PropTypes.func).isRequired,
  }).isRequired,
  dispatchRecipeDetail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);

// function FoodDetail() {
//   return <p>ok</p>
// }

// export default FoodDetail;
