import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesAppContext';
import { getDrinksStart } from '../services';

function Drinks({ title }) {
  const { setRecipes, isFetching, setIsFetching } = useContext(RecipesContext);

  //  export const getDrinksStart = async () => {
  //   const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //   const json = await response.json();
  //   setRecipes(json.drinks);
  // };

  useEffect(() => {
    getDrinksStart(setRecipes);
    // setRecipes(response);
    setIsFetching(false);
  }, []);

  if (isFetching) {
    return <span> Loading...</span>;
  }

  return (
    <Card title={ title } />
  );
}

Drinks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Drinks;
