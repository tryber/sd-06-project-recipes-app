import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteRecipes = () => {
  const [copied, setCopied] = useState(false);
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(favoriteRecipes);
  }, []);

  const copyToCB = (id) => {
    const url = `http://localhost:3000/comidas/${id}`;

    copy(url);
    setCopied(true);
  };

  const removeFavorite = (idRecipe) => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const zero = 0;
    let index;

    favoriteRecipes.forEach((item, i) => {
      if (item.id === idRecipe) {
        index = i;
      }
    });

    favoriteRecipes = [...favoriteRecipes.slice(zero, index),
      ...favoriteRecipes.slice(index + 1, favoriteRecipes.length)];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavRecipes(favoriteRecipes);
    console.log(favoriteRecipes);
  };

  const handleFilter = (filt) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let filteredFav;
    if (filt !== 'all') {
      filteredFav = favoriteRecipes.filter((recipe) => recipe.type === filt);
    } else if (filt === 'all') {
      filteredFav = favoriteRecipes;
    }
    setFavRecipes(filteredFav);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="row justify-content-center align-items-center m-4">
        <div className="col my-3">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            className="btn btn-block btn-lg my-2"
            style={ { background: '#7ed957' } }
            onClick={ () => handleFilter('all') }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            className="btn btn-block btn-lg my-2"
            style={ { background: '#7ed957' } }
            onClick={ () => handleFilter('comida') }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            className="btn btn-block btn-lg my-2"
            style={ { background: '#7ed957' } }
            onClick={ () => handleFilter('bebida') }
          >
            Drink
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        {favRecipes && favRecipes
          .map((recipe, index) => {
            const { id } = recipe;
            if (recipe.type === 'comida') {
              return (
                <div className="mx-4 col-6 col-sm-3">
                  <Link to={ `/comidas/${recipe.id}` }>
                    <img
                      src={ recipe.image }
                      alt={ recipe.name }
                      data-testid={ `${index}-horizontal-image` }
                      width="150"
                    />
                    <h5
                      data-testid={ `${index}-horizontal-name` }
                      className="card-title fonte"
                    >
                      { recipe.name }
                    </h5>

                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.area} - ${recipe.category}`}
                  </p>
                  <div className="d-inline">
                    <button
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="button"
                      className="btn"
                      onClick={ () => copyToCB(id) }
                      src={ shareIcon }
                    >
                      <img
                        src={ shareIcon }
                        alt="Compartilhar Receita"
                      />
                    </button>
                    {copied ? 'Link copiado!' : null}
                  </div>
                  <button
                    type="button"
                    onClick={ () => removeFavorite(recipe.id) }
                    src={ shareIcon }
                    className="btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      id="favorite-img"
                      src={ blackHeartIcon }
                      alt=""
                    />
                  </button>

                </div>

              );
            } if (recipe.type === 'bebida') {
              return (
                <div className="mx-4 col-6 col-sm-3">
                  <Link to={ `/bebidas/${recipe.id}` }>
                    <img
                      src={ recipe.image }
                      alt={ recipe.name }
                      data-testid={ `${index}-horizontal-image` }
                      width="200"

                    />
                    <h5
                      data-testid={ `${index}-horizontal-name` }
                      className="card-title fonte"
                    >
                      { recipe.name }
                    </h5>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                  <div className="d-inline">
                    <button
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="button"
                      className="btn"
                      onClick={ copyToCB }
                      src={ shareIcon }
                    >
                      <img
                        src={ shareIcon }
                        alt="Compartilhar Receita"
                      />
                    </button>
                    {copied ? 'Link copiado!' : null}
                  </div>
                  <button
                    type="button"
                    onClick={ () => removeFavorite(recipe.id) }
                    className="btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      id="favorite-img"
                      src={ blackHeartIcon }
                      alt=""
                    />
                  </button>

                </div>
              );
            }
            return '';
          })}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
