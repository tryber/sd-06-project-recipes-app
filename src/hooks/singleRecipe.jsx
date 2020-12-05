import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  fetchDrinkDetails, fetchRandomDrink, fetchDrinkRecommendations,
} from '../services/drinksApi';
import {
  fetchMealDetails, fetchRandomMeal, fetchFoodRecommendations,
} from '../services/foodApi';
import { useAuth } from './auth';

const singleRecipeStructure = {
  comidas: {
    recipe: {},
    recommendations: [],
  },
  bebidas: {
    recipe: {},
    recommendations: [],
  },
};

export const fetchSinglesOptions = {
  comidas: fetchMealDetails,
  bebidas: fetchDrinkDetails,
};

const fetchRecommendationsOptions = {
  comidas: fetchDrinkRecommendations,
  bebidas: fetchFoodRecommendations,
};

const fetchRandomOptions = {
  comidas: fetchRandomMeal,
  bebidas: fetchRandomDrink,
};

const singleRecipeContext = createContext();

function SingleRecipeProvider({ children }) {
  const [currentFocusedRecipes, setCurrentFocusedRecipes] = useState(
    singleRecipeStructure,
  );
  const [loadingSingleRecipe, setLoadingSingleRecipe] = useState(true);
  const [randomRedirect, setRandomRedirect] = useState(false);

  const { userToken } = useAuth();

  const loadSingleRecipe = useCallback(async (type, recipeID) => {
    if (randomRedirect) return;

    const loadRecipe = fetchSinglesOptions[type];
    const loadRecommendations = fetchRecommendationsOptions[type];

    try {
      const recipe = await loadRecipe(recipeID, userToken);

      let recommendations = await loadRecommendations(userToken);

      const REC_LIMIT = 6;
      recommendations = recommendations.filter((_, index) => index < REC_LIMIT);

      setCurrentFocusedRecipes((oldFocused) => ({
        ...oldFocused,
        [type]: {
          recipe,
          recommendations,
        },
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSingleRecipe(false);
    }
  }, [userToken, randomRedirect]);

  const loadRandomRecipe = useCallback(async (type) => {
    setLoadingSingleRecipe(true);

    const loadRandom = fetchRandomOptions[type];
    const loadRecommendations = fetchRecommendationsOptions[type];

    let randomID;
    let recipe;

    try {
      [randomID, recipe] = await loadRandom(userToken);

      let recommendations = await loadRecommendations(userToken);

      const REC_LIMIT = 6;
      recommendations = recommendations.filter((_, index) => index < REC_LIMIT);

      setRandomRedirect(true);

      setCurrentFocusedRecipes((oldFocused) => ({
        ...oldFocused,
        [type]: {
          recipe,
          recommendations,
        },
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSingleRecipe(false);
    }

    return randomID;
  }, [userToken]);

  const unloadRandom = useCallback(() => {
    setRandomRedirect(false);
  }, []);

  return (
    <singleRecipeContext.Provider
      value={ {
        currentFocusedRecipes,
        loadingSingleRecipe,
        loadSingleRecipe,
        loadRandomRecipe,
        unloadRandom,
      } }
    >
      {children}
    </singleRecipeContext.Provider>
  );
}

function useSingleRecipe() {
  const context = useContext(singleRecipeContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { SingleRecipeProvider, useSingleRecipe };

SingleRecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
