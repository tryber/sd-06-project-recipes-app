import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header } from '../Components';
import shareIcon from '../images/shareIcon.svg';
import '../Style/doneRecipes.css';

function ReceitasFeitas() {
  if (!localStorage.doneRecipes) {
    localStorage.doneRecipes = JSON.stringify([]);
  }
  const [type, setType] = useState('');
  const [copied, setCopied] = useState('');

  const handleFilters = ({ target }) => {
    setType(target.id);
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
      <div className="filter-done">
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
      <div className="done-recipes-container">
        {
          JSON.parse(localStorage.doneRecipes)
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
                    <p
                      data-testid={ `${index}-horizontal-done-date` }
                      style={ { fontSize: '10px', color: 'white' } }
                    >
                      {food.doneDate}
                    </p>
                    {food.tags.map((tag, indexs) => (
                      <p
                        key={ indexs }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </Link>
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
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
