import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchApiDrink from '../services/FetchApiDrink';
import ShareIcon from '../images/shareIcon.svg';
import desFavorite from '../images/whiteHeartIcon.svg';

import '../App.css';

export default function DrinkInProgress() {
  const { state, setState } = useContext(RecipesContext);
  const params = useParams();
  const [checkIngred, setCheckIngred] = useState([]);
  const objStorage = [];

  // carregar API
  useEffect(() => {
    fetchApiDrink('6', setState, String(params.id));
    if (localStorage.recipesInProgress) {
      const getLocalStorage = JSON.parse(
        localStorage
          .getItem('recipesInProgress'),
      );
      if (getLocalStorage.drink[params.id]) {
        setCheckIngred(getLocalStorage.drink[params.id]);
        console.log(getLocalStorage.drink[params.id]);
      }
    }
  }, []);

  // função marcar os ingredientes e salvar no localStorage.
  const checked = (e) => {
    console.log('estado', checkIngred);
    //  marcar ingredientes
    const vai = e.target;
    const label = document.getElementsByClassName('1')[vai.id];
    console.log('input', label.htmlFor);
    label.classList.add('checked');
    objStorage.push((label.htmlFor));
    console.log('click', objStorage);
    const { idDrink } = state[0]; // pega id da receita atual
    const initial = {
      meals: {},
    };
    const currentStorage = JSON.parse(
      localStorage
        .getItem('recipesInProgress'),
    ) || initial;
    //  console.log('current', currentStorage);
    const newStorage = {
      ...currentStorage,
      drink: {
        ...currentStorage.drink,
        ...{ [idDrink]: objStorage },
      },
    };
    localStorage.setItem('recipesInProgress', JSON.stringify(newStorage));
    setCheckIngred(newStorage.drink[params.id]); // controla o click do input(checked)
  };

  // função favoritar
  const favoritar = (e) => {
    const click = e.target;
    const white = 'http://localhost:3000/static/media/whiteHeartIcon.ea3b6ba8.svg';
    const black = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
    if (click.src === white) {
      click.src = black;
    } else {
      click.src = white;
    }
  };
  //  console.log('checado', checkIngred);
  return (
    <div>
      {state.map((el, idx) => (
        <div key="1">
          <img
            key={ idx }
            src={ el.strDrinkThumb }
            alt="food-pic"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{el.strDrink}</h1>
          <h3 data-testid="recipe-category">{el.strCategory}</h3>
          <content>
            {
              (el.strIngredient1 !== null && el.strIngredient1 !== '')
                && (
                  <label
                    htmlFor="0"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient1 }
                    <input
                      id="0"
                      checked={ checkIngred.includes('0') }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient2 !== null && el.strIngredient2 !== '')
                && (
                  <label
                    htmlFor="1"
                    className="1"
                    data-testid="2-ingredient-step"
                  >
                    { el.strIngredient2 }
                    <input
                      id="1"
                      checked={ checkIngred.includes('1') }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient3 !== null && el.strIngredient3 !== '')
                && (
                  <label
                    htmlFor="2"
                    className="1"
                    data-testid="3-ingredient-step"
                  >
                    { el.strIngredient3 }
                    <input
                      id="2"
                      checked={ !checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient4 !== null && el.strIngredient4 !== '')
                && (
                  <label
                    htmlFor="3"
                    className="1"
                    data-testid="4-ingredient-step"
                  >
                    { el.strIngredient4 }
                    <input
                      id="3"
                      checked={ !checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient5 !== null && el.strIngredient5 !== '')
                && (
                  <label
                    htmlFor="4"
                    className="1"
                    data-testid="5-ingredient-step"
                  >
                    { el.strIngredient5 }
                    <input
                      id="4"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient6 !== null && el.strIngredient6 !== '')
                && (
                  <label
                    htmlFor="5"
                    className="1"
                    data-testid="6-ingredient-step"
                  >
                    { el.strIngredient6 }
                    <input
                      id="5"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient7 !== null && el.strIngredient7 !== '')
                && (
                  <label
                    htmlFor="6"
                    className="1"
                    data-testid="7-ingredient-step"
                  >
                    { el.strIngredient7 }
                    <input
                      id="6"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient8 !== null && el.strIngredient8 !== '')
                && (
                  <label
                    htmlFor="7"
                    className="1"
                    data-testid="8-ingredient-step"
                  >
                    { el.strIngredient8 }
                    <input
                      id="7"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient9 !== null && el.strIngredient9 !== '')
                && (
                  <label
                    htmlFor="8"
                    className="1"
                    data-testid="9-ingredient-step"
                  >
                    { el.strIngredient9 }
                    <input
                      id="8"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient10 !== null && el.strIngredient10 !== '')
                && (
                  <label
                    htmlFor="9"
                    className="1"
                    data-testid="10-ingredient-step"
                  >
                    { el.strIngredient10 }
                    <input
                      id="9"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient11 !== null && el.strIngredient11 !== '')
                && (
                  <label
                    htmlFor="10"
                    className="1"
                    data-testid="11-ingredient-step"
                  >
                    { el.strIngredient11 }
                    <input
                      id="10"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient12 !== null && el.strIngredient12 !== '')
                && (
                  <label
                    htmlFor="11"
                    className="1"
                    data-testid="12-ingredient-step"
                  >
                    { el.strIngredient12 }
                    <input
                      id="11"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient13 !== null && el.strIngredient13 !== '')
                && (
                  <label
                    htmlFor="12"
                    className="1"
                    data-testid="13-ingredient-step"
                  >
                    { el.strIngredient13 }
                    <input
                      id="12"
                      checked={ checkIngred }
                      type="checkbox"
                      onChange={ (event) => checked(event) }
                    />
                  </label>
                )
            }
          </content>
          <content>
            <h2>Instructions</h2>
            <p data-testid="instructions">{el.strInstructions}</p>
          </content>
        </div>
      )) }
      <a
        href="/bebidas"
      >
        <img
          src={ ShareIcon }
          alt="foto-compratilhar"
          data-testid="share-btn"
        />
      </a>
      <input
        type="image"
        src={ desFavorite }
        alt="foto=favorito"
        data-testid="favorite-btn"
        onClick={ (event) => favoritar(event) }
      />
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>
  );
}
