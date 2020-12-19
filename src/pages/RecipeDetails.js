import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import recomendationsThunk from '../redux/actions/pageDetailsFetcher';
import recipeDetailsProcessing from '../utils/recipeDetailsProcessing';
import checkRecipeInProgress from '../utils/checkRecipeInProgress';
import checkSavedRecipe from '../utils/checkSavedRecipe';
import checkFavoriteRecipe from '../utils/checkFavoriteRecipe';
import DetailAndProgressBody from '../components/DetailAndProgressBody';

function RecipeDetails(
  { location: { pathname }, recommendations },
) {
  const [path, id] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const [disableButton, setdisableButton] = useState('visible');
  const [wasStarted, setWasStarted] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const buttonsProps = {
    path,
    id,
    isFav,
    wasCopied,
    setIsFav,
    setWasCopied,
  };

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    recipeDetailsProcessing(id, path, setRecipe);
    dispatch(recomendationsThunk(path));
  }, []);

  useEffect(() => {
    checkSavedRecipe(recipe, setdisableButton);
    checkRecipeInProgress(path, recipe, setWasStarted);
    setIsFav(checkFavoriteRecipe(id));
  }, [recipe]);

  return (
    <main>
      <DetailAndProgressBody
        recipe={ recipe }
        buttonsProps={ buttonsProps }
        recommendations={ recommendations }
      />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className={ `start-recipe-btn ${disableButton}` }
        onClick={ () => history.push(`/${path}/${id}/in-progress`) }
      >
        {wasStarted ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </main>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  recommendations: state.recommendationsReducer.recommendations,
});

export default connect(mapStateToProps)(RecipeDetails);
