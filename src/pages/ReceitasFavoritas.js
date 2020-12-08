import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import FavoriteRecipesFilter from '../components/FavoriteRecipesFilter';
import '../css/Cards.css';
import RecipesContext from '../context/RecipesContext';

function ReceitasFavoritas() {
  const [filteredFavoriteList, setFilteredFavoriteList] = useState([]);
  const { favoriteList } = useContext(RecipesContext);
  const { favoriteFilter } = useContext(RecipesContext);

  useEffect(() => {
    if (favoriteFilter === 'all') {
      setFilteredFavoriteList(favoriteList);
    } else {
      const filteredFavoriteRecipes = favoriteList
        .filter((item) => item.type === favoriteFilter);
      setFilteredFavoriteList(filteredFavoriteRecipes);
    }
  }, [favoriteFilter, favoriteList]);

  return (
    <div className="Favorite-recipes-body">
      <Header pageTitle="Receitas Favoritas" searchAbled={ false } />
      <FavoriteRecipesFilter />
      { filteredFavoriteList && filteredFavoriteList.map((recipe, index) => (
        <FavoriteRecipeCard key={ `${index}-recipe` } recipe={ recipe } index={ index } />
      ))}
    </div>
  );
}

export default ReceitasFavoritas;
