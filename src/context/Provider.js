import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Context from './Context';
import fetchMeal from '../services/fetchMeal';
import fetchDrink from '../services/fetchDrink';

function RecipesAppProvider({ children }) {
  const [details, setDetails] = useState('');
  const [recommended, setRecommended] = useState('');
  const [random, setRandom] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heart, setHeart] = useState('');
  const [copied, setCopied] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientExplore, setIngredientExplore] = useState('');

  const isFavorite = (id) => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!local) return setHeart('white');
    const match = local.filter((item) => item.id === id);
    return (match.length >= 1 ? setHeart('black') : setHeart('white'));
  };

  const favorite = (recipe, path, id) => {
    const ZERO = 0;
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const one = local ? local.filter((item) => item.id === id) : '';
    const compare = path.includes('comida');
    const newFav = {
      id: compare ? recipe.idMeal : recipe.idDrink,
      type: compare ? 'comida' : 'bebida',
      area: compare ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: compare ? '' : recipe.strAlcoholic,
      name: compare ? recipe.strMeal : recipe.strDrink,
      image: compare ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    const localFavorite = one.length > ZERO
      ? local.filter((item) => item.id !== id)
      : [
        ...(!local ? '' : local),
        newFav,
      ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(localFavorite));
  };

  const share = (url) => {
    const time = 3000;
    copy(`http://localhost:3000${url}`);
    setCopied('copy');
    setTimeout(() => setCopied(false), time);
  };

  const recipesToRender = async (type, searchTerm) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('name', searchTerm)
      : fetchDrink('name', searchTerm)
    );

    const first = 0;
    const twelfth = 12;

    if (!fetchedRecipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      fetchedRecipes = fetchedRecipes.slice(first, twelfth);
      setRecipes(fetchedRecipes);
    }
  };

  const categoriesToRender = async (type) => {
    let categoriesList = await (type === 'meal'
      ? fetchMeal('allCategories')
      : fetchDrink('allCategories')
    );
    const first = 0;
    const fifth = 5;

    categoriesList = categoriesList.slice(first, fifth);
    setCategories(categoriesList);
  };

  const recipesToRenderByCategory = async (type, searchTerm) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('category', searchTerm)
      : fetchDrink('category', searchTerm)
    );
    const first = 0;
    const twelfth = 12;

    fetchedRecipes = fetchedRecipes.slice(first, twelfth);
    setRecipes(fetchedRecipes);
  };

  const recipesToRenderByIngredient = async (type, searchTerm) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('ingredient', searchTerm)
      : fetchDrink('ingredient', searchTerm)
    );

    const first = 0;
    const twelfth = 12;

    if (!fetchedRecipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      fetchedRecipes = fetchedRecipes.slice(first, twelfth);
      setRecipes(fetchedRecipes);
    }
  };

  const ingredientToRender = async (type) => {
    let IngredientList = await (type === 'meal'
      ? fetchMeal('allIngredients')
      : fetchDrink('allIngredients')
    );
    const first = 0;
    const twelfth = 12;

    if (!IngredientList) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      IngredientList = IngredientList.slice(first, twelfth);
      setIngredients(IngredientList);
    }
  };

  const recipesToRenderByFirstLetter = async (type, searchTerm) => {
    let fetchedRecipes = await (type === 'meal'
      ? fetchMeal('firstLetter', searchTerm)
      : fetchDrink('firstLetter', searchTerm)
    );

    const first = 0;
    const twelfth = 12;

    if (!fetchedRecipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      fetchedRecipes = fetchedRecipes.slice(first, twelfth);
      setRecipes(fetchedRecipes);
    }
  };

  const recipesToRenderByArea = async (areaSearch = '') => {
    let fetchedRecipes = await (areaSearch === 'All'
      ? fetchMeal('name')
      : fetchMeal('area', areaSearch)
    );

    const first = 0;
    const twelfth = 12;

    if (fetchedRecipes) {
      fetchedRecipes = fetchedRecipes.slice(first, twelfth);
      setRecipes(fetchedRecipes);
    } else setRecipes([]);
  };

  const getMealDetail = async (id) => {
    const api = await fetchMeal('details', id);
    setDetails(api);
  };

  const getDrinkDetail = async (id) => {
    const api = await fetchDrink('details', id);
    setDetails(api);
  };

  const getRecommendedDrink = async () => {
    const api = await fetchDrink('name', '');
    setRecommended(api);
  };

  const getRecommendedMeal = async () => {
    const api = await fetchMeal('name', '');
    setRecommended(api);
  };

  const getRandomDrink = async () => {
    const api = await fetchDrink();
    setRandom(api);
  };

  const getRandomMeal = async () => {
    const api = await fetchMeal();
    setRandom(api);
  };

  const contextValue = {
    getMealDetail,
    getDrinkDetail,
    getRecommendedDrink,
    getRecommendedMeal,
    getRandomDrink,
    getRandomMeal,
    favorite,
    isFavorite,
    share,
    ingredientExplore,
    setIngredientExplore,
    copied,
    heart,
    setHeart,
    details,
    recommended,
    random,
    recipes,
    recipesToRender,
    ingredientToRender,
    categories,
    ingredients,
    setIngredients,
    categoriesToRender,
    recipesToRenderByCategory,
    recipesToRenderByIngredient,
    recipesToRenderByFirstLetter,
    recipesToRenderByArea,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
