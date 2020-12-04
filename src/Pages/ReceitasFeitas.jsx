import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header } from '../Components';
import shareIcon from '../images/shareIcon.svg';

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
        JSON.parse(localStorage.doneRecipes)
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
              </div>

              {copied}
              <p data-testid={ `${index}-horizontal-done-date` }>{food.doneDate}</p>
              {food.tags.map((tag, indexs) => (
                <p
                  key={ indexs }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </div>
          ))
      }
    </div>
  );
}

export default ReceitasFeitas;
