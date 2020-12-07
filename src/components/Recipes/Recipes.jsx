import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import CategoryDisplay from '../CategoryDisplay/CategoryDisplay';
import RecipeCard from '../RecipeCard';
import './Recipes.css';

const Recipes = () => {
  const {
    pageTitle,
    recipes,
    setRecipes,
    setLoading,
    selectedCategory,
    ingredientFilter,
    setIngredientFilter,
  } = useContext(Context);

  const [newRecipes, setNewRecipes] = useState([]);

  useEffect(() => {
    const ingredient = (ingredientFilter) ? 'ingredient' : '';
    if (pageTitle === 'Comidas') {
      setLoading(true);
      getMealsAPI(ingredientFilter, ingredient).then((data) => {
        setRecipes(data);
        setLoading(false);
        setIngredientFilter('');
      });
    } else if (pageTitle === 'Bebidas') {
      setLoading(true);
      getDrinksApi(ingredientFilter, ingredient).then((data) => {
        setRecipes(data);
        setLoading(false);
        setIngredientFilter('');
      });
    }
  }, [pageTitle]);
  useEffect(() => {
    if (selectedCategory !== '' && pageTitle === 'Comidas') {
      setLoading(true);
      getMealsAPI(`c=${selectedCategory}`, 'byCategory').then((data) => {
        setNewRecipes(data);
        setLoading(false);
      });
    } else if (selectedCategory !== '' && pageTitle === 'Bebidas') {
      setLoading(true);
      getDrinksApi(`c=${selectedCategory}`, 'byCategory').then((data) => {
        setNewRecipes(data);
        setLoading(false);
      });
    }
  }, [selectedCategory]);
  function renderCards() {
    if (recipes) {
      const MAX_CARDS = 11;
      if (selectedCategory === '') {
        return (
          recipes.map((recipe, index) => {
            let url = 'bebidas';
            if (recipe.idMeal) {
              url = 'comidas';
            }
            const recipeId = recipe.idMeal || recipe.idDrink;
            while (index <= MAX_CARDS) {
              return (
                <Link
                  to={ `/${url}/${recipeId}` }
                >
                  <RecipeCard
                    key={ recipe.idMeal || recipe.idDrink }
                    recipe={ recipe }
                    index={ index }
                  />
                </Link>
              );
            }
            return undefined;
          })
        );
      }
      if (selectedCategory !== '') {
        return (
          newRecipes.map((recipe, index) => {
            let url = 'bebidas';
            if (recipe.idMeal) {
              url = 'comidas';
            }
            const recipeId = recipe.idMeal || recipe.idDrink;
            while (index <= MAX_CARDS) {
              return (
                <Link
                  to={ `/${url}/${recipeId}` }
                >
                  <RecipeCard
                    key={ recipe.idMeal || recipe.idDrink }
                    recipe={ recipe }
                    index={ index }
                  />
                </Link>
              );
            }
            return undefined;
          })
        );
      }
    }
    return undefined;
  }
  return (
    <div className="wrapper">
      <CategoryDisplay />
      <div className="recipes-container">
        { renderCards() }
      </div>
    </div>
  );
};
export default Recipes;
