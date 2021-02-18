import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DoneRecipeCard from './DoneRecipeCard';

function DoneRecipesList({ recipeTypeSelected, doneRecipesConfig }) {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );

  const filterRecipesByType = (recipes, recipeType) => recipes.filter(
    (recipe) => recipe.type === recipeType, recipeType,
  );

  const renderDoneRecipes = (recipes, recipeType) => (
    recipes.map((recipe) => (
      <DoneRecipeCard
        recipe={ recipe }
        key={ recipe.id }
        recipeConfig={ doneRecipesConfig[recipeType] }
      />))
  );

  if (doneRecipes) {
    return (
      <div>
        {renderDoneRecipes(filterRecipesByType(doneRecipes, recipeTypeSelected))}
      </div>
    );
  }
  return (
    <> Não existem receitas feitas</>
  );
}

const mapStateToProps = (state) => ({
  recipeTypeSelected: state.searchRecipes.recipeTypeSelected,
  doneRecipesConfig: state.sitemap.receitasFeitas.doneRecipesCard,
});

DoneRecipesList.propTypes = {
  recipeTypeSelected: PropTypes.string.isRequired,
  doneRecipesConfig: PropTypes.shape({
    comidas: PropTypes.string.isRequired,
    bebidas: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(DoneRecipesList);
