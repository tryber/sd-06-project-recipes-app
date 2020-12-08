import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import '../css/Cards.css';
import RecipesContext from '../context/RecipesContext';

function ReceitasFeitas() {
  const [filteredDoneList, setFilteredDoneList] = useState([]);
  const { doneFilter } = useContext(RecipesContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (doneFilter === 'all') {
      setFilteredDoneList(doneRecipes);
    } else {
      const filteredDoneRecipes = doneRecipes
        .filter((item) => item.type === doneFilter);
      setFilteredDoneList(filteredDoneRecipes);
    }
  }, [doneFilter]);

  return (
    <div className="done-recipes-body">
      <Header pageTitle="Receitas Feitas" searchAbled={ false } />
      <DoneRecipesFilter />
      { filteredDoneList && filteredDoneList.map((recipe, index) => (
        <DoneRecipeCard key={ `${index}-recipe` } recipe={ recipe } index={ index } />
      ))}
    </div>
  );
}

export default ReceitasFeitas;
