import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import * as api from '../services/Api';
import './styles/pages.css';
// import Header from '../Components/Header';

export default function ProcessoComidas() {
  const { id } = useParams();
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    selectedMeal,
    setSelectedMeal,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [check, setCheck] = useState(true);
  const [sharedURL, setSharedURL] = useState(false);

  const prepareFood = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    setSelectedMeal(meal[0]);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Receita em Progresso');
    prepareFood();
  }, []);

  const getIngredientsArray = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    for (let index = noLength; index <= maxLenght; index += 1) {
      if (selectedMeal.length !== noLength && selectedMeal[`strIngredient${index}`]) {
        ingredients.push(`${selectedMeal[`strIngredient${index}`]} 
        ${selectedMeal[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    getIngredientsArray();
    console.log(arrayIngredients);
  }, [selectedMeal]);

  const arrayIngredientsLength = arrayIngredients.length;
  const idIngredientsfeitos = [];
  const onClick = ({ target }) => {
    const element = target;
    const ingredientId = element.parentNode.htmlFor;

    if (target.checked === true) {
      element.parentNode.style = 'text-decoration: line-through;';
      idIngredientsfeitos.push(ingredientId);
    }
    if (target.checked === false) {
      element.parentNode.style = 'text-decoration: none;';
      if (idIngredientsfeitos.includes(ingredientId)) {
        const findIngredientInArray = idIngredientsfeitos.indexOf(ingredientId);
        console.log('qual index', findIngredientInArray);
        idIngredientsfeitos.splice(findIngredientInArray, 1);
        console.log('array de ingredientes feitos2', idIngredientsfeitos);
      }
    }
    console.log('ingredientId', ingredientId);
    console.log('array de ingredientes feitos', idIngredientsfeitos);
    if (arrayIngredientsLength === idIngredientsfeitos.length) {
      setCheck(false);
    }
  };

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    console.log(url);
    setSharedURL(true);
  };

  return (
    <div className="container-processo-comida">
      <h1 className="bg-warning pl-3 pb-1">{titulo}</h1>
      {loading ? <p>Loading...</p>
        : (
          <div className="d-flex flex-column">
            <img
              className="rounded align-self-center"
              src={ selectedMeal.strMealThumb }
              data-testid="recipe-photo"
              alt="foto-recipe"
              width="200px"
            />
            <h2 className="text-warning align-self-center font-weight-bold" data-testid="recipe-title">{selectedMeal.strMeal}</h2>
            <div>
              <button
                className="btn btn-warning"
                type="button"
                src={ ShareIcon }
                alt="compartilhar"
                data-testid="share-btn"
                onClick={ urlToClipboard }
              >
                <img src={ ShareIcon } alt="compartilhar" />
              </button>
              <button
                className="btn btn-warning"
                type="button"
                src={ HeartIcon }
                alt="favoritar"
                data-testid="favorite-btn"
              >
                <img src={ HeartIcon } alt="favoritar" />
              </button>
            </div>
            {sharedURL ? <p className="text-warning">Link copiado!</p> : null}
            <h3 className="text-warning mt-2 font-weight-bold" data-testid="recipe-category">{selectedMeal.strCategory}</h3>
            <div className="bg-warning ml-3 mr-3 rounded">
              { arrayIngredients.map((ingredient, index) => (
                <label
                  className="mr-1 ml-1"
                  htmlFor={ index }
                  key={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ index }
                    nome={ ingredient }
                    value={ ingredient }
                    onClick={ (e) => onClick(e) }
                  />
                  { ingredient }
                </label>
              ))}
            </div>
            <h3 className="text-warning align-self-center font-weight-bold mt-2">Instructions</h3>
            <div className="bg-warning ml-3 mr-3 rounded">
              <p
                data-testid="instructions"
                className="riscado"
              >
                {selectedMeal.strInstructions}
              </p>
            </div>
            <Link to="/receitas-feitas">
              <button
                type="button"
                className="btn btn-warning mt-2"
                data-testid="finish-recipe-btn"
                disabled={ check }
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
