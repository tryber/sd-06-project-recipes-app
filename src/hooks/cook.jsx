import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import { fetchSinglesOptions } from './singleRecipe';

import saveDoneRecipe from './utils/saveDoneRecipes';
import { useAuth } from './auth';

const cookRecipesStructure = {
  comidas: [],
  bebidas: [],
};

const localStorageTrack = {
  cocktails: {},
  meals: {},
};

const recipeIdOptions = {
  comidas: 'idMeal',
  bebidas: 'idDrink',
};

const typeToKey = {
  comidas: 'meals',
  bebidas: 'cocktails',
};

const cookContext = createContext();

function CookProvider({ children }) {
  const [cookedRecipes, setCookedRecipes] = useState(cookRecipesStructure);
  const [recipesProgress, setRecipesProgress] = useState(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      return inProgressRecipes;
    }

    return localStorageTrack;
  });
  const [doneRecipes, setDoneRecipes] = useState(() => {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));

    if (recipesDone) {
      return recipesDone;
    }

    return [];
  });

  const { userToken } = useAuth();

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesProgress));
  }, [recipesProgress]);

  const startCooking = useCallback((type, recipe) => {
    setCookedRecipes((oldCooks) => {
      const oldRecipesStarted = oldCooks[type];

      const newRecipeStarted = {
        recipe,
        finished: false,
      };

      return {
        ...oldCooks,
        [type]: [...oldRecipesStarted, newRecipeStarted],
      };
    });
  }, []);

  const updateRecipeProgress = useCallback((type, recipeID, item) => {
    setRecipesProgress((oldRecipes) => {
      const typeKey = typeToKey[type];

      const recipeProgress = oldRecipes[typeKey][recipeID] || [];

      if (recipeProgress.includes(item)) {
        const itemIndex = recipeProgress.findIndex((itemAdded) => itemAdded === item);

        recipeProgress.splice(itemIndex, 1);
      } else {
        recipeProgress.push(item);
      }

      const oldRecipesProgressOnType = oldRecipes[typeKey];
      const updatedRecipesProgressOnType = {
        ...oldRecipesProgressOnType,
        [recipeID]: recipeProgress,
      };

      return ({
        ...oldRecipes,
        [typeKey]: updatedRecipesProgressOnType,
      });
    });
  }, []);

  const finalizeRecipe = useCallback((type, recipeID) => {
    setCookedRecipes((oldCooks) => {
      const oldRecipesStarted = oldCooks[type];

      const updatedRecipes = oldRecipesStarted.map(({ recipe, finished }) => {
        const recipeAccess = recipeIdOptions[type];
        const recipeToUpdateID = recipe[recipeAccess];

        if (recipeToUpdateID !== recipeID) {
          return { recipe, finished };
        }

        const recipeUpdated = { recipe, finished: true };

        const newDoneRecipes = saveDoneRecipe(type, recipe);
        setDoneRecipes(newDoneRecipes);

        return recipeUpdated;
      });

      return {
        ...oldCooks,
        [type]: [updatedRecipes],
      };
    });
  }, []);

  const loadRecipeToCook = useCallback(async (type, recipeID) => {
    const fetchSingle = fetchSinglesOptions[type];

    try {
      const recipe = await fetchSingle(recipeID, userToken);

      startCooking(type, recipe);
    } catch (err) {
      console.log(err);
    }
  }, [userToken]);

  return (
    <cookContext.Provider
      value={ {
        cookedRecipes,
        recipesProgress,
        doneRecipes,
        startCooking,
        updateRecipeProgress,
        finalizeRecipe,
        loadRecipeToCook,
      } }
    >
      {children}
    </cookContext.Provider>
  );
}

function useCook() {
  const context = useContext(cookContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { CookProvider, useCook };

CookProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
