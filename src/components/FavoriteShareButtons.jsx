import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import CopyToClipBoard from './CopyToClipBoard';

function FavoriteButton({ recipeId, type, testId = '', page = '' }) {
  const { favoriteRecipes, setFavoriteRecipes, recipeGlobal, recipesDone,
    isFetching, setIsFetching } = useContext(ReceitasContext);
  const textTime = 3000;
  const [copied, setClipboard] = CopyToClipBoard(textTime);

  // Configuração de chaves e id conforme tipo da receita
  const id = recipeId;
  let recipe;
  if (page === 'recipes-done') {
    recipe = recipesDone.find((recipeObj) => recipeObj.id === id);
  } else if (page === 'favorite-recipes') {
    recipe = favoriteRecipes.find((recipeObj) => recipeObj.id === id);
  } else {
    recipe = recipeGlobal;
  }

  const urlByType = (type === 'meal') ? 'comidas' : 'bebidas';
  const [isFavorite, setIsFavorite] = useState('');

  // Ao montar
  useEffect(() => {
    setIsFetching(true);
    const recipesInFavorite = favoriteRecipes;

    const recipeIsAlreadyFavorite = recipesInFavorite
      .map((eachRecipe) => eachRecipe.id).includes(id);

    setIsFavorite(recipeIsAlreadyFavorite);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualiza quando o estado local mudar (isFavorite)
  const checkFavorite = () => {
    // Se for false inclui a receita em favoriteRecipes
    // Se for true exclui a receita em favoriteRecipes
    if (!isFavorite) {
      setFavoriteRecipes((prevState) => {
        const obj = (page === '')
          ? {
            id,
            type: type === 'meal' ? 'comida' : 'bebida',
            area: recipe.strArea || '',
            category: recipe.strCategory,
            alcoholicOrNot: type === 'meal' ? '' : recipe.strAlcoholic,
            name: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}`],
            image: recipe[`str${(type === 'meal') ? 'Meal' : 'Drink'}Thumb`],
          }
          : {
            id,
            type: recipe.type,
            area: recipe.area || '',
            category: recipe.category,
            alcoholicOrNot: recipe.alcoholicOrNot,
            name: recipe.name,
            image: recipe.image,
          };
        return ([
          ...prevState,
          obj,
        ]);
      });
      setIsFavorite((prevState) => !prevState);
    } else {
      setFavoriteRecipes((prevState) => {
        const zero = 0;
        let favoriteIndex;
        prevState.forEach((recipeFavorited, index) => {
          if (recipeFavorited.id === id) favoriteIndex = index;
        });
        return ([
          ...prevState.slice(zero, favoriteIndex),
          ...prevState.slice(favoriteIndex + 1),
        ]);
      });
      setIsFavorite((prevState) => !prevState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const checkPageBeforeRenderBtns = () => {
    if (page === 'recipes-done') {
      return (
        <section className="detalhes-buttons">
          <button
            data-testid={ testId === ''
              ? 'share-btn' : `${testId}-horizontal-share-btn` }
            type="button"
            className="detalhes-share"
            onClick={ () => setClipboard(`/${urlByType}/${id}`) }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="compartilhe" />
            { copied ? <span className="share-copiado">Link copiado!</span> : true }
          </button>
        </section>
      );
    }
    return (
      <section className="detalhes-buttons">
        <button
          data-testid={ testId === ''
            ? 'favorite-btn' : `${testId}-horizontal-favorite-btn` }
          type="button"
          className="detalhes-fav"
          onClick={ checkFavorite }
          src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="compartilhe"
          />
        </button>
        <button
          data-testid={ testId === ''
            ? 'share-btn' : `${testId}-horizontal-share-btn` }
          type="button"
          className="detalhes-share"
          onClick={ () => setClipboard(`/${urlByType}/${id}`) }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="compartilhe" />
          { copied ? <span className="share-copiado">Link copiado!</span> : true }
        </button>
      </section>
    );
  };

  return (
    <section>
      {!isFetching && checkPageBeforeRenderBtns()}
    </section>
  );
}

FavoriteButton.propTypes = {
  type: propTypes.string.isRequired,
  testId: propTypes.number.isRequired,
  recipeId: propTypes.string.isRequired,
  page: propTypes.string.isRequired,
};

export default FavoriteButton;
