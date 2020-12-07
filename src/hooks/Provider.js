import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import recipeRequest from '../services/recipeRequest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Provider = ({ children }) => {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foodFilter, setFoodFilter] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState([]);
  const [ids, setIds] = useState('');
  const [foodRecommendation, setFoodRecommendation] = useState([]);
  const [DrinkRecommendation, setDrinkRecommendation] = useState([]);
  const [liked, setLiked] = useState(whiteHeartIcon);
  const [foodIngredientsCategory, setFoodIngredientsCategory] = useState([]);
  const [drinkIngredientsCategory, setDrinkIngredientsCategory] = useState([]);

  const history = useHistory();
  const getAPI = async () => {
    setIsLoading(true);
    const foodFilterRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const drinkFilterRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const foodRequest = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const drinkRequest = await recipeRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    await setDrinkRecipes(drinkRequest.drinks);
    await setFoodRecipes(foodRequest.meals);
    await setFoodFilter(foodFilterRequest.meals);
    await setDrinkFilter(drinkFilterRequest.drinks);
    setIsLoading(false);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleLikes = (food, drink) => {
    const id = history.location.pathname.split('/')[2];
    if (liked === whiteHeartIcon) {
      setLiked(blackHeartIcon);
      const typeRecipe = history.location.pathname.split('/')[1];
      if (typeRecipe === 'comidas') {
        const favoriteFood = {
          id: food.idMeal,
          type: 'comida',
          area: food.strArea,
          category: food.strCategory,
          alcoholicOrNot: '',
          name: food.strMeal,
          image: food.strMealThumb,
        };
        const itens = JSON.parse(localStorage.favoriteRecipes);
        const AllFavorites = itens.concat(favoriteFood);
        localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
      } else {
        const favoriteFood = {
          id: drink.idDrink,
          type: 'bebida',
          area: '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        };
        const itens = JSON.parse(localStorage.favoriteRecipes);
        const AllFavorites = itens.concat(favoriteFood);
        localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
      }
    } else {
      setLiked(whiteHeartIcon);
      const itens = JSON.parse(localStorage.favoriteRecipes);
      const AllFavorites = itens.filter((item) => item.id !== id);
      console.log(AllFavorites);
      localStorage.favoriteRecipes = JSON.stringify(AllFavorites);
    }
  };

  const contextValue = {
    foodRecipes,
    drinkRecipes,
    isLoading,
    setIsLoading,
    foodFilter,
    drinkFilter,
    setFoodRecipes,
    setDrinkRecipes,
    ids,
    setIds,
    foodRecommendation,
    setFoodRecommendation,
    DrinkRecommendation,
    setDrinkRecommendation,
    handleLikes,
    setLiked,
    liked,
    foodIngredientsCategory,
    setFoodIngredientsCategory,
    drinkIngredientsCategory,
    setDrinkIngredientsCategory,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
