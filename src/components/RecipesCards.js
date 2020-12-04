import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import RecipesDrinksCards from './RecipesDrinksCards';
import RecipesMealsCards from './RecipesMealsCards';
import '../style/RecipeCards.css';

function RecipesCards({ title }) {
  const { isLoading } = useContext(RecipesContext);
  const [categories, setCategories] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const responseJson = await response.json();

      const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const responseJson2 = await response2.json();
      setCategories([responseJson, responseJson2]);
    }
    fetchCategories();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (title === 'Comidas')
    ? <RecipesMealsCards categories={ categories } />
    : <RecipesDrinksCards categories={ categories } />;
}

RecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipesCards;
