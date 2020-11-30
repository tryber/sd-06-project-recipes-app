import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function RecipeInProgress({ recipesDetail, match: { params: { id } } }) {
  const [recipeDetail, setRecipeDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getRecipeById = () => recipesDetail.find((recipeDtl) => recipeDtl.id === id);

  useEffect(() => {
    setRecipeDetail(getRecipeById());
  }, []);

  useEffect(() => {
    if (recipeDetail) setIsLoading(false);
  }, [recipeDetail]);

  const renderRecipeInProgress = () => (
    <p>{recipeDetail.instruction}</p>
  );

  const render = () => {
    if (isLoading) return <p>carregando</p>;
    return renderRecipeInProgress();
  };

  return render();
}

const mapStateToProps = (state) => ({
  recipesDetail: state.searchRecipes.foodInProgress,
});
export default connect(mapStateToProps)(RecipeInProgress);
