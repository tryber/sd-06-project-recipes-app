import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

import { useAuth } from './auth';

import { fetchMealIngredients,
  fetchFoodAreas,
  fetchFoodsByArea,
} from '../services/foodApi';
import { fetchDrinkIngredients } from '../services/drinksApi';
import { useRecipes } from './recipes';

const fetchIngredientsOptions = {
  comidas: fetchMealIngredients,
  bebidas: fetchDrinkIngredients,
};

const exploreContext = createContext();

function ExploreProvider({ children }) {
  const [ingredientsSearched, setIngredientsSearched] = useState([]);
  const [foodAreas, setFoodAreas] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingFoodsByArea, setLoadingFoodsByArea] = useState(false);

  const { userToken } = useAuth();
  const { updateRecipes } = useRecipes();

  const loadIngredients = useCallback(async (type) => {
    const fetchIngredients = fetchIngredientsOptions[type];

    try {
      const ingredients = await fetchIngredients(userToken);

      const MAX_INGREDIENTS_ALLOWED = 12;

      const appIngredients = ingredients.filter((_, index) => (
        index < MAX_INGREDIENTS_ALLOWED
      ));

      const normalizedIngredients = appIngredients.map((ingredient) => {
        const iRegex = /strIngredient/i;

        const ingredientKey = (
          Object
            .keys(ingredient)
            .filter((key) => iRegex.test(key))
        );

        const ingredientName = ingredient[ingredientKey];

        return ingredientName;
      });

      setIngredientsSearched(normalizedIngredients);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingIngredients(false);
    }
  }, [userToken]);

  const loadAreas = useCallback(async () => {
    try {
      const apiAreas = await fetchFoodAreas(userToken);

      const areaNames = apiAreas.map((area) => area.strArea);

      setFoodAreas(areaNames);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAreas(false);
    }
  }, [userToken]);

  const loadFoodsByArea = useCallback(async (area) => {
    setLoadingFoodsByArea(true);

    try {
      const recipesByArea = await fetchFoodsByArea(area, userToken);
      const areaType = 'comidas';

      updateRecipes(areaType, recipesByArea);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingFoodsByArea(false);
    }
  }, [userToken, updateRecipes]);

  return (
    <exploreContext.Provider
      value={ {
        ingredientsSearched,
        foodAreas,
        loadingIngredients,
        loadingAreas,
        loadingFoodsByArea,
        loadIngredients,
        loadAreas,
        loadFoodsByArea,
      } }
    >
      {children}
    </exploreContext.Provider>
  );
}

function useExplore() {
  const context = useContext(exploreContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { ExploreProvider, useExplore };

ExploreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
