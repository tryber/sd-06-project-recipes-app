import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FavoriteFilters from '../components/FavoriteFilters';
import shareIcon from '../images/shareIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';
import Header from '../components/header';
import '../Style/Favorites.css';

function FavoriteRecipes() {
  const {
    renderFavoriteRecipes,
    setRenderFavoriteRecipes,
  } = useContext(RecipesAppContext);

  const [share, setShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const removeFromFavorites = (id) => {
    const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setIsFavorite(!isFavorite);
  };

  const checkRecipeIsfavorite = () => {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRenderFavoriteRecipes(favoriteRecipes);
  };

  const copyClip = async (type, id) => {
    setShare(true);
    const url = `http://localhost:3000/${type}s/${id}`;
    await copy(url);
  };

  useEffect(() => {
    setRenderFavoriteRecipes(favoriteRecipes);
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    checkRecipeIsfavorite();
  }, [isFavorite]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div>
        <FavoriteFilters />
      </div>
      {renderFavoriteRecipes.map((recipe, index) => (
        <div
          key={ index }
          className="card-favorites"
        >
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt="Imagem da receita"
              data-testid={ `${index}-horizontal-image` }
              className="image-favorite"
            />
          </Link>
          { (recipe.type === 'comida') && (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} - ${recipe.category}` }
            </p>
          )}
          { (recipe.type === 'bebida') && (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </p>
          )}
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h1>
          </Link>
          <div>
            <button
              type="button"
              onClick={ () => removeFromFavorites(recipe.id) }
              className="btn btn-outline-dark-favorites"
            >
              <img
                src={ blackHeartIcon }
                alt="Favoritar"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => copyClip(recipe.type, recipe.id) }
              className="btn btn-outline-dark-favorites"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Favoritar"
              />
            </button>
            { share && <span>Link copiado!</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
