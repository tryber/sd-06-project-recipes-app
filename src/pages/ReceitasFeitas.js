import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import useCopyToClipboard from '../services/clipboard-copy';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const timeoutTextCopy = 2000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);

  useEffect(() => {
    if (!localStorage.doneRecipes) {
      return <p>Você ainda não tem nenhuma receita pronta.</p>;
    }
    setDoneRecipes(JSON.parse(localStorage.doneRecipes));
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
    <>
      <Header />
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
      {doneRecipes
        .map((
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
          indexRecipe,
        ) => (
          <span
            key={ indexRecipe }
          >
            <Link to={ `/${type}s/${id}` }>
              <img
                className="receipe-img"
                src={ image }
                alt={ name }
                data-testid={ `${indexRecipe}-horizontal-image` }
              />
            </Link>
            <div>
              <Link to={ `/${type}s/${id}` }>
                <h1
                  data-testid={ `${indexRecipe}-horizontal-name` }
                >
                  {name}
                </h1>
              </Link>
              {
                (type === 'comida')
                  ? (
                    <p
                      data-testid={ `${indexRecipe}-horizontal-top-text` }
                    >
                      { `${area} - ${category}`}
                    </p>)
                  : (
                    <p data-testid={ `${indexRecipe}-horizontal-top-text` }>
                      { alcoholicOrNot }
                    </p>)
              }
              <p
                data-testid={ `${indexRecipe}-horizontal-done-date` }
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
                src={ shareIcon }
                alt="Compatilhar Receita"
                data-testid={ `${indexRecipe}-horizontal-share-btn` }
              />
            </button>
            {isCopied ? <p>Link copiado!</p> : true}
            {tags.map((tag, indexTag) => (
              <p
                key={ indexTag }
                data-testid={ `${indexRecipe}-${tags[indexTag]}-horizontal-tag` }
              >
                { tag }
              </p>
            ))}
          </span>
        ))}
    </>
  );
}

export default ReceitasFeitas;
