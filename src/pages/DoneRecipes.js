import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderExplorePages from '../components/HeaderExplorePages';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const localSt = JSON.parse(localStorage.getItem('doneRecipes'));
  const [spanHidden, setSpanHidden] = useState(true);
  const [allState, setAllState] = useState(true);
  const [mealsState, setMealsState] = useState(false);
  const [drinkState, setDrinkState] = useState(false);

  function copyToClipBoard(type, id, url) {
    const splitedUrl = url.split('receitas-feitas').join('');
    const completeUrl = [splitedUrl, type, 's', '/', id].join('');
    console.log(type);
    console.log(id);
    console.log(url);
    console.log(completeUrl);
    navigator.clipboard.writeText(completeUrl);
    setSpanHidden(false);
  }

  function handleMealsAndDrinks(e) {
    const typeBtn = e.target.value;
    if (typeBtn === 'comida') {
      setAllState(false);
      setMealsState(true);
      setDrinkState(false);
    }
    if (typeBtn === 'bebida') {
      setAllState(false);
      setMealsState(false);
      setDrinkState(true);
    }
    if (typeBtn === 'all') {
      setAllState(true);
      setMealsState(false);
      setDrinkState(false);
    }
  }

  return (
    <div>
      <HeaderExplorePages pageName="Receitas feitas" />
      <br />
      <br />
      <br />
      <br />
      {/* <h2 data-testid="page-title">Receitas Feitas</h2> */}
      <div className="done-recipes-buttons-div">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
          value="all"
          onClick={ (e) => handleMealsAndDrinks(e) }
          className="done-recipes-buttons"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="comida"
          value="comida"
          onClick={ (e) => handleMealsAndDrinks(e) }
          className="done-recipes-buttons"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="bebida"
          value="bebida"
          onClick={ (e) => handleMealsAndDrinks(e) }
          className="done-recipes-buttons"
        >
          Drinks
        </button>
      </div>
      <div className="cards-div">
        { allState
          ? localSt && localSt.map((item, index) => (
            <div key={ index } className="card">
              <Link to={ `/${item.type}s/${item.id}` } className="foodCard-link">
                <img
                  height="150px"
                  src={ item.image }
                  alt="element img"
                  data-testid={ `${index}-horizontal-image` }
                  className="done-card-img"
                />
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  className="done-card-title"
                >
                  { item.name }
                </h2>
              </Link>
              <p
                className="done-card-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { item.type === 'comida'
                  ? `${item.area} - ${item.category}`
                  : `${item.alcoholicOrNot} - ${item.category}` }
              </p>
              <p
                className="done-card-done-date"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { item.doneDate }
              </p>
              {/* {
                item.tags
              && item.tags.map(
                (tag, idx) => (
                  <p
                    className="done-card-tag"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ idx }
                  >
                    { tag }
                  </p>
                ),
              )
              } */}
              <button
                className="done-card-share-button"
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => copyToClipBoard(item.type, item.id, document.URL) }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>
            </div>
          ))
          : null }
        {
          mealsState
            ? localSt
            && localSt.filter((el) => el.type === 'comida').map((item, index) => (
              <div key={ index } className="card">
                <Link to={ `/${item.type}s/${item.id}` } className="foodCard-link">
                  <img
                    src={ item.image }
                    alt="element img"
                    data-testid={ `${index}-horizontal-image` }
                    className="done-card-img"
                  />
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                    className="done-card-title"
                  >
                    { item.name }
                  </h2>
                </Link>
                <p
                  className="done-card-text"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {
                    item.type === 'comida'
                      ? `${item.area} - ${item.category}`
                      : `${item.alcoholicOrNot} - ${item.category}`
                  }
                </p>
                <p
                  className="done-card-done-date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { item.doneDate }
                </p>
                {/* {
                  item.tags
                && item.tags.map(
                  (tag, idx) => (
                    <p
                      className="done-card-tag"
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ idx }
                    >
                      { tag }
                    </p>
                  ),
                )
                } */}
                <button
                  className="done-card-share-button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  src={ shareIcon }
                  onClick={ () => copyToClipBoard(item.type, item.id, document.URL) }
                >
                  <img src={ shareIcon } alt="Share Icon" />
                </button>
              </div>
            ))
            : null
        }
        { drinkState
          ? localSt && localSt.filter((el) => el.type === 'bebida').map((item, index) => (
            <div key={ index } className="card">
              <Link to={ `/${item.type}s/${item.id}` } className="foodCard-link">
                <img
                  src={ item.image }
                  alt="element img"
                  data-testid={ `${index}-horizontal-image` }
                  className="done-card-img"
                />
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  className="done-card-title"
                >
                  { item.name }
                </h2>
              </Link>
              <p
                className="done-card-text"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {
                  item.type === 'comida'
                    ? `${item.area} - ${item.category}`
                    : `${item.alcoholicOrNot} - ${item.category}`
                }
              </p>
              <p
                className="done-card-done-date"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { item.doneDate }
              </p>
              {/* {
                item.tags
              && item.tags.map(
                (tag, idx) => (
                  <p
                    className="done-card-tag"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ idx }
                  >
                    { tag }
                  </p>
                ),
              )
              } */}
              <button
                className="done-card-share-button"
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => copyToClipBoard(item.type, item.id, document.URL) }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>
            </div>
          ))
          : null }
      </div>
      <span className="span" hidden={ spanHidden }>Link copiado!</span>
    </div>
  );
}

export default DoneRecipes;
