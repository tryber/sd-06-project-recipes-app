import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { shareIcon, whiteHeartIcon, blackHeartIcon, loading } from '../images';
import '../style/DetalheProcesso.css';

function ProcessoBebida() {
  const timeoutTextCopy = 3000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];

  const handleChange = (target, index) => {
    if (target.checked) {
      setChecked([...checked, index]);
    } else {
      const removed = [...checked];
      removed.splice(removed.indexOf(index), 1);
      setChecked(removed);
    }
  };

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      favoriteRecipes.forEach((favorite) => {
        if (favorite.id === idDrink) {
          setIsFavorite(true);
        }
      });
    }
    if (localStorage.inProgressRecipes) {
      if (JSON.parse(localStorage.inProgressRecipes).cocktails) {
        const progress = JSON.parse(localStorage.inProgressRecipes);
        if (progress.cocktails[idDrink]) setChecked(progress.cocktails[idDrink]);
      } else {
        setChecked([]);
      }
    } else setChecked([]);
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);

  useEffect(() => {
    if (localStorage.inProgressRecipes) {
      const progress = JSON.parse(localStorage.inProgressRecipes);
      localStorage.inProgressRecipes = JSON.stringify({
        ...progress,
        cocktails: {
          ...progress.cocktails,
          [idDrink]: checked,
        },
      });
    } else {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: {
          [idDrink]: checked,
        },
      });
    }
    const result = (Object.keys(dataDrinks)
      .filter((keys) => keys.includes('Ingredient'))
      .filter((ingredient) => (
        dataDrinks[ingredient] !== '' && dataDrinks[ingredient] !== null
      )).length);
    if (result === checked.length) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [checked, dataDrinks, idDrink]);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    let favoriteRecipes = [];
    if (!isFavorite) {
      if (localStorage.favoriteRecipes) {
        favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
      }
      localStorage.favoriteRecipes = JSON.stringify([...favoriteRecipes, {
        id: dataDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: dataDrinks.strCategory,
        alcoholicOrNot: dataDrinks.strAlcoholic,
        name: dataDrinks.strDrink,
        image: dataDrinks.strDrinkThumb,
      }]);
    } else {
      favoriteRecipes = JSON.parse(localStorage.favoriteRecipes)
        .filter(({ id }) => id !== dataDrinks.idDrink);
      localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
    }
  };

  const saveDoneRecipes = () => {
    const date = new Date();
    const doneDate = date;
    let doneRecipes = [];
    if (localStorage.doneRecipes) {
      doneRecipes = JSON.parse(localStorage.doneRecipes);
    }
    localStorage.doneRecipes = JSON.stringify([...doneRecipes, {
      id: dataDrinks.idDrink,
      type: 'bebida',
      area: '',
      category: dataDrinks.strCategory,
      alcoholicOrNot: dataDrinks.strAlcoholic,
      name: dataDrinks.strDrink,
      image: dataDrinks.strDrinkThumb,
      doneDate,
      tags: [],
    }]);
  };

  return (isLoading) ? <img className="loading" src={ loading } alt="loading" /> : (
    <div className="container-details-progress">
      <img
        className="img-details-progress"
        data-testid="recipe-photo"
        src={ dataDrinks.strDrinkThumb }
        alt="Foto da receita"
      />
      <div className="div-header">
        <div className="div-icon">
          <button
            type="button"
            onClick={ handleClick }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Botão de Favorito"
            />
          </button>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => handleCopy(`/bebidas/${idDrink}`) }
          >
            <img
              src={ shareIcon }
              alt="Botão de Compartilhar"
            />
          </button>
          { isCopied && <span className="copy">Link copiado!</span> }
        </div>
        <div className="div-title">
          <h1 data-testid="recipe-title">
            { dataDrinks.strDrink }
          </h1>
        </div>
      </div>
      <div className="div-recipes">
        <h2 data-testid="recipe-category">
          Categoria
        </h2>
        { Object.keys(dataDrinks)
          .filter((keys) => keys.includes('Ingredient'))
          .map((ingredient, index) => {
            if (dataDrinks[ingredient] !== '' && dataDrinks[ingredient] !== null) {
              return (
                <div
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                  className="container-checkbox"
                >
                  <label htmlFor={ `check${index}` }>
                    <input
                      id={ `check${index}` }
                      type="checkbox"
                      name={ dataDrinks[ingredient] }
                      checked={ checked.includes(index) }
                      // hidden={true}
                      onChange={ ({ target }) => { handleChange(target, index); } }
                    />
                    <span className="checkmark">{ dataDrinks[ingredient] }</span>
                  </label>
                </div>
              );
            }
            return '';
          }) }
        <h2 data-testid="instructions">
          Instruções
        </h2>
        <p>{ dataDrinks.strInstructions }</p>
      </div>
      <div className="buttons-footer">
        <div>
          <Link to="/receitas-feitas">
            <button
              className="finish-recipe"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisable }
              onClick={ saveDoneRecipes }
            >
              Finalizar Receita
            </button>
          </Link>
          <Link to="/bebidas">
            <button
              className="back"
              type="button"
            >
              Ver Outras Receitas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProcessoBebida;
