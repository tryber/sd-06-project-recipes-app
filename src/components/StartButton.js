import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import '../Style/StartButton.css';

function StartButton({ id, title }) {
  let setRoute = '';
  let localStorageKey = '';

  if (title === 'comidas') {
    setRoute = 'comidas';
    localStorageKey = 'meals';
  } else {
    setRoute = 'bebidas';
    localStorageKey = 'cocktails';
  }

  const { startRecipe, setStartRecipe, finalizedRecipe } = useContext(RecipesAppContext);
  let textButton = 'Iniciar Receita';

  if (startRecipe && !finalizedRecipe) {
    textButton = 'Continuar Receita';
  }

  useEffect(() => {
    setStartRecipe(true);
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ [localStorageKey]: { [id]: [] } }));
  }, []);

  const alredyRecipeMade = '';

  const button = (
    <Link
      to={ `/${setRoute}/${id}/in-progress` }
    >
      <button
        className="btn container-button"
        type="button"
        data-testid="start-recipe-btn"
      >
        {textButton}
      </button>
    </Link>
  );

  if (finalizedRecipe) {
    return alredyRecipeMade;
  }
  return (
    button
  );
}

export default StartButton;
