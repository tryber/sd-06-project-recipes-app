import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';
import '../style/Detalhes.css';

const ReceitasFeitas = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleFilter = ({ target }) => {
    const { name } = target;

    setCurrentFilter(name);
  };

  const copyToCB = ({ target }) => {
    const { id, name } = target;
    const div = document.getElementById(id).parentElement.parentElement;
    const copied = document.createElement('span');

    copy(`http://localhost:3000/${name}s/${id}`);

    if (div.children.length === 1) {
      div.appendChild(copied).innerText = 'Link copiado!';
    }
  };

  return ((!recipes)
    ? <h1>No Recipes Yet!</h1>
    : (
      <section>
        <Header title="Receitas Feitas" />
        <div className="row justify-content-center align-items-center m-4">
          <div className="col my-3">
            <button
              id="All"
              name="all"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
              data-testid="filter-by-all-btn"
              onClick={ handleFilter }
            >
              All
            </button>
            <button
              id="Food"
              name="comida"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
              data-testid="filter-by-food-btn"
              onClick={ handleFilter }
            >
              Food
            </button>
            <button
              id="Drink"
              name="bebida"
              type="button"
              className="btn btn-block btn-lg my-2"
              style={ { background: '#7ed957' } }
              data-testid="filter-by-drink-btn"
              onClick={ handleFilter }
            >
              Drinks
            </button>
          </div>
        </div>
        {recipes.filter((recipe) => (
          (currentFilter === 'all') ? recipe.type : recipe.type === currentFilter
        ))
          .map((recipe, index) => (
            <div className="justify-content-center" key={ index }>
              <div className="detail-card">
                <Link
                  to={ `/${recipe.type === 'comida'
                    ? 'comidas' : 'bebidas'}/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    className="rounded col-12"
                    alt=""
                  />
                </Link>
                {recipe.area.length
                  ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${recipe.area} - ${recipe.category}`}
                    </p>
                  )
                  : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.alcoholicOrNot}
                    </p>
                  )}
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h3>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                <div className="detail-btn my-2">
                  <button type="button" className="btn" onClick={ copyToCB }>
                    <img
                      id={ recipe.id }
                      name={ recipe.type }
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ share }
                      alt="share"
                    />
                  </button>
                </div>
                {recipe.tags.map((tagName, indx) => (
                  <div
                    key={ indx }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </div>
                )) }
              </div>
            </div>
          ))}
      </section>
    )
  );
};

export default ReceitasFeitas;
