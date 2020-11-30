import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { Header } from '../components';
import { shareIcon, blackHeartIcon } from '../images';
import '../style/Receitas.css';

function ReceitasFavoritas() {
  const timeoutTextCopy = 3000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [favoriteRecipes, setFavoriteRecipe] = useState([]);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      return <h1>Você ainda não tem nenhuma receita Favorita. :(</h1>;
    }
    setFavoriteRecipe(JSON.parse(localStorage.favoriteRecipes));
  }, []);

  const handleClick = (index) => {
    const newFavoriteRecipes = [...favoriteRecipes];
    newFavoriteRecipes.splice(index, 1);
    setFavoriteRecipe(newFavoriteRecipes);
    localStorage.favoriteRecipes = JSON.stringify(newFavoriteRecipes);
  };

  const filterRecipes = ({ innerText }) => {
    if (innerText === 'Food') {
      const newFavorite = favoriteRecipes.filter((favorite) => (
        favorite.type === 'comida'
      ));
      setFavoriteRecipe(newFavorite);
    } else if (innerText === 'Drinks') {
      const newFavorite = favoriteRecipes.filter((favorite) => (
        favorite.type === 'bebida'
      ));
      setFavoriteRecipe(newFavorite);
    } else {
      setFavoriteRecipe(JSON.parse(localStorage.favoriteRecipes));
    }
  };

  return (
    <div className="recipes-maked">
      <Header title="Receitas Favoritas" />
      <div className="button-recipes-maked">
        <button
          className="button-all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ ({ target }) => { filterRecipes(target); } }
        >
          All
        </button>
        <button
          className="button-meal"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ ({ target }) => { filterRecipes(target); } }
        >
          Food
        </button>
        <button
          className="button-drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ ({ target }) => { filterRecipes(target); } }
        >
          Drinks
        </button>
      </div>
      <div className="recipes-recipes-maked">
        { favoriteRecipes
          .map((
            {
              id,
              type,
              image,
              alcoholicOrNot,
              name,
              area,
              category,
              doneDate,
              tags,
            },
            index,
          ) => (
            <span
              key={ index }
            >
              <Link to={ `/${type}s/${id}` }>
                <img
                  className="receipe-img"
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="title-recipes-maked">
                <div>
                  <Link to={ `/${type}s/${id}` }>
                    <h1
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </h1>
                  </Link>
                  {
                    (type === 'comida')
                      ? (
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          { `${area} - ${category}` }
                        </p>)
                      : (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { alcoholicOrNot }
                        </p>)
                  }
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    { doneDate }
                  </p>
                </div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => handleCopy(`/${type}s/${id}`) }
                >
                  <img
                    src={ shareIcon }
                    alt="Compatilhar Receita"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { isCopied ? <p>Link copiado!</p> : true }
                <button
                  type="button"
                  onClick={ () => { handleClick(index); } }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Botão de Favorito"
                  />
                </button>
                {tags ? tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag }
                  </p>
                )) : '' }
              </div>
            </span>
          )) }
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
