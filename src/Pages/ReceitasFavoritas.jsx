import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header } from '../Components';
import shareIcon from '../images/shareIcon.svg';
import RecipeContext from '../hooks/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../Style/doneRecipes.css';

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
      <Header pageName="Receitas Favoritas" />
      <div className="filter-done">
        <button
          onClick={ handleFilters }
          type="button"
          id=""
          data-testid="filter-by-all-btn"
          className="filter-button"
        >
          All
        </button>
        <button
          onClick={ handleFilters }
          type="button"
          id="comida"
          data-testid="filter-by-food-btn"
          className="filter-button"
        >
          Food
        </button>
        <button
          onClick={ handleFilters }
          type="button"
          id="bebida"
          data-testid="filter-by-drink-btn"
          className="filter-button"
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-container">
        {
          JSON.parse(localStorage.favoriteRecipes)
            .filter((element) => element.type.includes(type)).map((food, index) => (
              <div key={ index } className="done-recipes-card">
                <Link to={ `/${food.type}s/${food.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ food.image }
                    alt={ food.name }
                    className="done-recipe-img"
                  />
                  <div className="done-recipe-info">
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      style={ { fontSize: '12px', color: '#A8997A' } }
                    >
                      { (food.type === 'comida')
                        ? `${food.area} - ${food.category}`
                        : food.alcoholicOrNot }
                    </p>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                      style={ { fontSize: '14px', color: '#FFE5AD' } }
                    >
                      { food.name }
                    </p>
                  </div>
                </Link>
                <div className="fav-btn-container">
                  <button
                    onClick={ () => handleCopy(food) }
                    type="button"
                    className="done-recipe-btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt={ food.name }
                    />

                  </button>
                  {copied}

                  <button
                    onClick={ () => handleLikes(food) }
                    type="button"
                    className="done-recipe-btn"
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
    </div>
  );
}

export default ReceitasFavoritas;
