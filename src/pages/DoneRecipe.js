import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCopyToClipboard from '../hook/clipboard-copy';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipe() {
  const timeoutTextCopy = 2000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    // if (!localStorage.doneRecipes) {
    //   return <h1>Você ainda não tem nenhuma receita pronta. </h1>;
    // }
    if (localStorage.doneRecipes) setDoneRecipes(JSON.parse(localStorage.doneRecipes));
  }, []);

  const filterRecipes = ({ innerText }) => {
    if (innerText === 'Food') {
      const newDone = doneRecipes.filter((done) => (
        done.type === 'comida'
      ));
      setDoneRecipes(newDone);
    } else if (innerText === 'Drinks') {
      const newDone = doneRecipes.filter((done) => (
        done.type === 'bebida'
      ));
      setDoneRecipes(newDone);
    } else {
      setDoneRecipes(JSON.parse(localStorage.doneRecipes));
    }
  };

  return (
    <div className="recipes-maked">
      <Header title="Receitas Feitas" />
      <div className="button-recipes-maked">
        <button
          type="button"
          className="StartRecipe"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
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
        { !localStorage.doneRecipes
          ? <h1>Você ainda não tem nenhuma receita pronta!</h1>
          : doneRecipes.map((
            { id,
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
                  className="recipeImage"
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
                      {name}
                    </h1>
                  </Link>
                  {
                    (type === 'comida')
                      ? (
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          { `${area} - ${category}`}
                        </p>)
                      : (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { alcoholicOrNot}
                        </p>)
                  }
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {doneDate}
                  </p>
                </div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => handleCopy(`/${type}s/${id}`) }
                >
                  <img
                    alt="Compatilhar Receita"
                    src={ ShareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                {isCopied ? <p>Link copiado!</p> : true}
                {tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag}
                  </p>
                ))}
              </div>
            </span>
          ))}
      </div>
    </div>
  );
}

export default DoneRecipe;
