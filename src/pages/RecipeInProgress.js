import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import {
  filterMatchInKeys,
  modifyResponse,
  modifyResponseToFavoriteBtn,
} from '../helpers/assets';
import '../css/recipeProgress.css';

function RecipeInProgress(props) {
  const { fetchId: { Comidas, Bebidas },
    match: { path, params: { id } },
  } = props;
  const [recipeDetail, setRecipeDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientsItem, setIngredientsItem] = useState([]);
  const [mesuresItem, setMesuresItem] = useState([]);
  const [ingredientMesureJoined, setIngredientMesureJoined] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [keyName, setKeyName] = useState();
  const [checkedClass, setCheckedClass] = useState({});
  const [listState, setListState] = useState({});
  const [filterFlag, setFilterFlag] = useState(false);
  const [type, setType] = useState();
  const [withLocalStorage, setWithLocalStorage] = useState({});
  const [favoriteResponseModified, setFavoriteResponseModified] = useState();
  const [isDisable, setIsDisable] = useState(true);

  const getIngredientsAndMesures = (object) => {
    const ingredients = filterMatchInKeys(/strIngredient/i, object);
    const showIngredients = ingredients.map((ingred) => object[ingred])
      .filter((eachIngredient) => eachIngredient !== '' && eachIngredient !== null);
    setIngredientsItem(showIngredients);
    const mesures = filterMatchInKeys(/strMeasure/i, object);
    const showMesures = mesures.map((mesu) => object[mesu])
      .filter((eachMesure) => eachMesure !== '' && eachMesure !== null);
    setMesuresItem(showMesures);
  };

  const fetchIdRecipe = async () => {
    if (path === '/bebidas/:id/in-progress') {
      const recipeType = 'drinks';
      const nameType = 'Drink';
      const name = 'bebida';
      const changeCategory = 'strAlcoholic';
      const response = await Bebidas.idDrink(id);
      console.log(response);
      setRecipeDetail(modifyResponse(response, nameType, recipeType, changeCategory));
      setFavoriteResponseModified(modifyResponseToFavoriteBtn(
        response, nameType, recipeType, name,
      ));
      setType('cocktails');
      getIngredientsAndMesures(response.drinks[0]);
    } else {
      const recipeType = 'meals';
      const nameType = 'Meal';
      const name = 'comida';
      const changeCategory = 'strCategory';
      const response = await Comidas.idFood(id);
      console.log(response);
      setRecipeDetail(modifyResponse(response, nameType, recipeType, changeCategory));
      setFavoriteResponseModified(modifyResponseToFavoriteBtn(
        response, nameType, recipeType, name,
      ));
      setType(recipeType);
      getIngredientsAndMesures(response.meals[0]);
    }
  };

  const joinIngredientsAndMesures = () => {
    const joined = ingredientsItem
      .map((ingredient, index) => ([`${ingredient} - ${mesuresItem[index]}`]));
    setIngredientMesureJoined(joined);
  };

  const settingListStateWithAnObject = () => {
    const stateList = ingredientsItem.map((el) => ({ [el]: false }));
    const joinObject = stateList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setListState(joinObject);
  };

  const settingCheckedClassWithAnObject = () => {
    const checkList = ingredientsItem.map((el) => ({ [el]: 'no-check' }));
    const joinObject = checkList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setCheckedClass(joinObject);
  };

  const disableButton = () => {
    const allItems = Object.keys(listState);
    const checked = allItems.every((item) => listState[item] === true);
    setIsDisable(!checked);
  };

  const saveProgress = () => {
    if (path === '/bebidas/:id/in-progress') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [id]: ingredientsItem
            .filter((ingredientUsed) => (
              listState[ingredientUsed] === true
            )),
          checkedList: listState,
          classList: checkedClass,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [id]: ingredientsItem
            .filter((ingredientUsed) => (
              listState[ingredientUsed] === true
            )),
          checkedList: listState,
          classList: checkedClass,
        },
      }));
    }
  };

  useEffect(() => {
    const savedIngredients = localStorage.getItem('inProgressRecipes');
    const parseSavedIngredients = JSON.parse(savedIngredients);
    setWithLocalStorage(parseSavedIngredients);
    fetchIdRecipe();
  }, []);

  useEffect(() => {
    joinIngredientsAndMesures();
  }, [mesuresItem]);

  useEffect(() => {
    if (filterFlag) {
      saveProgress();
    }
  }, [checkedClass]);

  useEffect(() => {
    if (recipeDetail) setIsLoading(false);
    console.log(recipeDetail);
  }, [recipeDetail]);

  useEffect(() => {
    settingListStateWithAnObject();
    settingCheckedClassWithAnObject();
  }, [ingredientsItem]);

  useEffect(() => {
    if (checkedClass[keyName] === 'no-check') {
      setCheckedClass({
        ...checkedClass, [keyName]: 'check-toggle',
      });
    }
    if (checkedClass[keyName] === 'check-toggle') {
      setCheckedClass({
        ...checkedClass, [keyName]: 'no-check',
      });
    }
  }, [isChecked]);

  useEffect(() => {
    disableButton();
  }, [listState]);

  const handleOnClick = (event) => {
    const { target: { name } } = event;
    setIsChecked(!isChecked);
    setKeyName(name);
    setFilterFlag(true);
    setListState({
      ...listState, [name]: !listState[name],
    });
  };

  const renderWithoutLocalStorage = () => {
    if (withLocalStorage === null || withLocalStorage[type] === undefined) {
      return (
        ingredientsItem.map((eachIngredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <label className={ checkedClass[eachIngredient] } htmlFor={ index }>
              <input
                name={ eachIngredient }
                id={ index }
                type="checkbox"
                value={ eachIngredient }
                checked={ listState[eachIngredient] }
                onChange={ (event) => handleOnClick(event) }
              />
              {ingredientMesureJoined[index]}
            </label>
          </li>
        ))
      );
    }

    return (
      ingredientsItem.map((eachIngredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-step` }>
          <label
            className={ withLocalStorage[type].classList[eachIngredient] }
            htmlFor={ index }
          >
            <input
              name={ eachIngredient }
              id={ index }
              type="checkbox"
              value={ eachIngredient }
              checked={ withLocalStorage[type].checkedList[eachIngredient] }
              onChange={ (event) => handleOnClick(event) }
            />
            {ingredientMesureJoined[index]}
          </label>
        </li>
      )));
  };

  const renderRecipeInProgress = () => {
    // const ingredientsUnsaved = ingredientsItem
    // .filter((unsaved, index) => unsaved !== parseSavedIngredients[type][id][index]);

    const { img, title, category, instruction } = recipeDetail;
    // console.log('ingredientes=', ingredientsItem);
    // console.log('medidas=', mesuresItem);
    // console.log('objeto desconstruido', recipeDetail);
    // console.log(listState);
    // console.log(checkedClass);
    // console.log(parseSavedIngredients[type][id]);
    // console.log(ingredientsUnsaved);
    // console.log(ingredientMesureJoined);
    // console.log(withLocalStorage);
    console.log(favoriteResponseModified);
    return (
      <div>
        <img data-testid="recipe-photo" src={ img } alt={ title } width="150" />
        <h1 data-testid="recipe-title">{title}</h1>
        <ShareButton type={ type } id={ id } />
        <FavoriteButton recipe={ favoriteResponseModified } id={ id } />
        <h3 data-testid="recipe-category">{category}</h3>
        <h2>Ingredients</h2>
        <ul>
          {renderWithoutLocalStorage()}
        </ul>
        <h2>Instruction</h2>
        <p data-testid="instructions">{instruction}</p>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ isDisable }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  };
  const render = () => {
    if (isLoading) return <p>Loading</p>;
    return renderRecipeInProgress();
  };

  return render();
}

const mapStateToProps = (state) => ({
  recipesDetail: state.searchRecipes.foodInProgress,
  fetchId: state.fetchmap,
});
export default connect(mapStateToProps)(RecipeInProgress);
