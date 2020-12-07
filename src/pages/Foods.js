import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIRecipes } from '../services';
import Card from '../components/Card';
import ContextRecipes from '../context/ContextRecipes';
import CategoryButtons from '../components/CategoryButtons';

function Foods() {
  const { setRecipes, showCard, setShowCard, recipes } = useContext(ContextRecipes);
  const MAGIC_NUMBER_ZERO = 0;
  const fetchRecipes = async () => {
    const recipesApi = await fetchAPIRecipes('name', '');
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
      <Header fetchApi={ fetchAPIRecipes } title="Comidas" showSearchIcon />
      <CategoryButtons resetFilter={ fetchRecipes } />
      {showCard && <Card />}
      <Footer />
    </div>
  );
}

export default Foods;
