import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { loadState } from '../services/localStorage';
import buttonShare from '../styles/images/shareIcon.svg';
import '../styles/marginHederAndFooter.css';
import '../styles/ReceitasFinalizadas.css';

function ReceitasFeitas() {
  const copyBoard = (id, type) => {
    let url = '';
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
    } else {
      url = `http://localhost:3000/bebidas/${id}`;
    }
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById(id);
    divBtns.innerHTML = 'Link copiado!';
  };

  const All = 'All';
  const Food = 'Food';
  const Drink = 'Drink';

  const [categoryFilter, setCategoryFilter] = useState(All);

  const onClickFilter = (typeFilter) => {
    setCategoryFilter(typeFilter);
  };

  const filterFavorites = () => {
    if (categoryFilter === All) {
      return loadState('doneRecipes', []);
    }
    let categoryFilter2 = '';
    if (categoryFilter === Food) categoryFilter2 = 'comida';
    if (categoryFilter === Drink) categoryFilter2 = 'bebida';
    return loadState('doneRecipes', [])
      .filter((objFavorite) => objFavorite.type === categoryFilter2);
  };

  const arrayFilterNames = [
    All,
    Food,
    Drink,
  ];

  return (
    <div className="container-margin-heder">
      <Header name="Receitas Feitas" button={ false } />
      {arrayFilterNames.map((Filter) => {
        const lowerCaseFilter = Filter.toLowerCase();
        return (
          <button
            className="category-food-btn-receitas"
            key={ Filter }
            type="button"
            data-testid={ `filter-by-${lowerCaseFilter}-btn` }
            onClick={ () => onClickFilter(Filter) }
          >
            { Filter }
          </button>
        );
      })}
      <div className="container-favoritas">
        {filterFavorites().map(({
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        }, index) => (
          <div
            className="container-card-food"
            key={ index }
          >
            <Link to={ `/${type}s/${id}` }>
              <img
                className="imgBig"
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="conteudo-card">
              {(type === 'comida') && (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </span>
              )}
              {(type === 'bebida') && (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { alcoholicOrNot }
                </span>
              )}
              <Link to={ `/${type}s/${id}` }>
                <span
                  className="food-title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </span>
              </Link>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Feita em : ${doneDate}`}
              </span>
              {console.log(typeof tags)}
              {(type === 'comida' && tags) && (
                tags.map((sdes) => (
                  <span
                    key={ sdes }
                    data-testid={ `${index}-${sdes}-horizontal-tag` }
                  >
                    {sdes}
                  </span>
                ))
              )}
              <div>
                <button
                  className="btn-copy-link"
                  type="button"
                  onClick={ () => copyBoard(id, type) }
                >
                  <img
                    src={ buttonShare }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="img-button-share"
                  />
                </button>
                <span id={ id } />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
