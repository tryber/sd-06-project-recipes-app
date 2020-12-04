import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header } from '../Components';
import shareIcon from '../images/shareIcon.svg';
import RecipeContext from '../hooks/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  if (!localStorage.favoriteRecipes) {
    localStorage.favoriteRecipes = JSON.stringify([]);
  }
  const [type, setType] = useState('');
  const [copied, setCopied] = useState('');
  const [removed, setRemoved] = useState(false);
  const {
    setLiked,
    liked,
  } = useContext(RecipeContext);
  const handleFilters = ({ target }) => {
    setType(target.id);
  };
  useEffect(() => {
    setLiked(blackHeartIcon);
  }, []);
  const handleLikes = (food) => {
    const without = JSON.parse(localStorage.favoriteRecipes)
      .filter((el) => el.id !== food.id);
    localStorage.favoriteRecipes = JSON.stringify(without);
    setRemoved(!removed);
  };
  const handleCopy = (food) => {
    const url = `http://localhost:3000/${food.type}s/${food.id}`;
    copy(url);
    const TWO = 2000;
    setCopied('Link copiado!');
    setInterval(() => setCopied(''), TWO);
  };
  return (
    <div style={ { marginTop: '80px' } }>
      <Header pageName="Receitas Feitas" />
      <p data-testid="page-title">Receitas Favoritas</p>
      <div className="filter-buttons">
        <button
          onClick={ handleFilters }
          type="button"
          id=""
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ handleFilters }
          type="button"
          id="comida"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          onClick={ handleFilters }
          type="button"
          id="bebida"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {
        JSON.parse(localStorage.favoriteRecipes)
          .filter((element) => element.type.includes(type)).map((food, index) => (
            <div key={ index }>
              <Link to={ `/${food.type}s/${food.id}` }>
                <img
                  width="200"
                  data-testid={ `${index}-horizontal-image` }
                  src={ food.image }
                  alt={ food.name }
                />
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  { (food.type === 'comida')
                    ? `${food.area} - ${food.category}`
                    : food.alcoholicOrNot }
                </h3>
                <h2 data-testid={ `${index}-horizontal-name` }>{ food.name }</h2>
              </Link>
              <div>
                <button
                  onClick={ () => handleCopy(food) }
                  type="button"
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ food.name }
                  />

                </button>
                {copied}
              </div>
              <div>
                <button
                  onClick={ () => handleLikes(food) }
                  type="button"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ liked }
                    alt="favorite logo"
                  />
                </button>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default ReceitasFavoritas;
