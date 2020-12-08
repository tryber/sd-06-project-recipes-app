import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import ShareBtn from '../components/ShareBtn';

function FinishedRecipes() {
  const { setHeader } = useContext(AppContext);
  const [copied, setCopied] = useState('none');
  const [filter, setFilter] = useState('All');
  const two = 2;
  let recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (recipes === null) {
    recipes = [];
  }
  useEffect(() => {
    setHeader({ page: 'Receitas Feitas', search: false });
  }, []);

  const copyToClipboard = (type, id) => {
    setCopied('block');
    window.navigator.clipboard
      .writeText(window.location.toString()
        .replace('receitas-feitas', `${type}s/${id}`));
    window.navigator.clipboard
      .writeText(window.location.toString()
        .replace('receitas-feitas', `${type}s/${id}`));
  };

  return (
    <div>
      <Header />
      <div className="done-buttons">
        <button
          type="submit"
          onClick={ () => setFilter('All') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="categ-buttons"
          type="submit"
          onClick={ () => setFilter('comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="categ-buttons"
          type="submit"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </button>
      </div>
      <div className="bodier">
        {recipes.filter((e) => e.type === filter || filter === 'All')
          .map((recipe, index) => (
            <div key={ index } className="card">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h4 className="text" data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h4>
                <img
                  className="picture"
                  alt={ recipe.name }
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}` }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { recipe.doneDate }
              </p>
              { typeof recipe.tags === 'string'
                ? <p data-testid={ `0-${recipe.tags}-horizontal-tag` }>{ recipe.tags }</p>
                : recipe.tags.filter((e) => recipe.tags.indexOf(e) < two).map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))}
              <div>
                <ShareBtn
                  copy={ () => copyToClipboard(recipe.type, recipe.id) }
                  testid="done"
                  index={ index }
                />
                <span
                  className="link-copy"
                  style={ { display: copied } }
                >
                  Link copiado!
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FinishedRecipes;
