import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIDrinks } from '../services';
import Card from '../components/Card';
import ContextRecipes from '../context/ContextRecipes';
import CategoryButtons from '../components/CategoryButtons';

function Drinks() {
  const { setRecipes, showCard, setShowCard, recipes } = useContext(ContextRecipes);
  const MAGIC_NUMBER_ZERO = 0;

  const fetchRecipes = async () => {
    const recipesApi = await fetchAPIDrinks('name', '');
    setRecipes(recipesApi);
    setShowCard(true);
  };

  useEffect(() => {
    if (recipes.length === MAGIC_NUMBER_ZERO) {
      fetchRecipes();
    } else {
      setShowCard(true);
    }
  }, []);

  return (
    <div>
      <Header title="Bebidas" fetchApi={ fetchAPIDrinks } showSearchIcon />
      <CategoryButtons resetFilter={ fetchRecipes } />
      {showCard && <Card />}
      <Footer />
    </div>
  );
}

export default Drinks;
