import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiDrinkDetails } from '../services/requestDrink';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';
import { loadState, saveState } from '../services/localStorage';
import '../styles/Processos.css';
import '../styles/Detalhes.css';

function ProcessoBebida({ match: { params: { id } }, history }) {
  const zero = 0;
  const quinze = 15;
  const [detailsDrink, setdetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [countCheck, setCountCheck] = useState(zero);

  const initialValueArrayCheckBox = () => {
    const arrayVoid = [];
    const loadStateStorage = loadState('inProgressRecipes', { cocktails: {
      [id]: arrayVoid } });
    if (Object.keys(loadStateStorage)
      .some((key) => key === 'cocktails')
    && Object.keys(loadStateStorage.cocktails)
      .some((key) => key === id)) {
      return loadStateStorage.cocktails[id];
    }
    return arrayVoid;
  };

  const [arrayCheckBox, setArrayCheckBox] = useState(initialValueArrayCheckBox());

  useEffect(() => {
    requestApiDrinkDetails(id)
      .then((response) => {
        setdetailsDrink(response[0]);
        // console.log(response[0]);
      });
  }, []);

  useEffect(() => {
    const loadStorage = loadState('inProgressRecipes', { cocktails: {} });
    saveState('inProgressRecipes', {
      ...loadStorage,
      cocktails:
        { ...loadStorage.cocktails, [id]: [...arrayCheckBox] },
    });
  }, [arrayCheckBox]);

  const ingredientsFunc = () => {
    if (detailsDrink.length !== zero) {
      const array = [];
      for (let i = 1; i <= quinze; i += 1) {
        const detIngredient = `${detailsDrink[`strIngredient${i}`]}`;
        const ingredient = `${detIngredient}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '' && element !== 'null');
      setArrayIngredients(arrayReturn);
    }
  };

  const riskCheckBox = (event, element) => {
    const checkBox = document.getElementById(`${event.target.id}`);
    if (checkBox.checked) {
      const labelBox = document.getElementsByName(`${event.target.id}`);
      labelBox[0].className = 'riscado';
      setCountCheck(countCheck + 1);
      setArrayCheckBox([...arrayCheckBox, element]);
    } else {
      const labelBox = document.getElementsByName(`${event.target.id}`);
      labelBox[0].className = 'non-riscado';
      setCountCheck(countCheck - 1);
      const filterArrayCheckBox = arrayCheckBox
        .filter((ingredient) => ingredient !== element);
      setArrayCheckBox(filterArrayCheckBox);
    }
  };

  useEffect(() => {
    ingredientsFunc();
  }, [detailsDrink]);

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/bebidas/${id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    divBtns.innerHTML = 'Link copiado!';
  };

  const onClickDone = () => {
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const {
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
      strTags,
    } = detailsDrink;
    const tag = strTags ? strTags.split(',') : null;
    saveState('doneRecipes', [
      ...loadState('doneRecipes', []),
      {
        id,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: date,
        tags: tag,
      },
    ]);
    history.push('/receitas-feitas');
  };

  if (detailsDrink.length === zero) {
    return (
      <div>Loading...</div>);
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ detailsDrink.strDrinkThumb }
        alt="food-thumb"
        className="detalhes-img"
      />
      <div className="header-detalhes">
        <div>
          <span
            className="titulo"
            data-testid="recipe-title"
          >
            {detailsDrink.strDrink}
          </span>
          <br />
          <span data-testid="recipe-category">{detailsDrink.strCategory}</span>
        </div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyBoard }
            className="btn-copy-link"
          >
            <img src={ buttonShare } alt="img-button-share" />
          </button>
          <FavoriteHeart id={ id } detailsDrink={ detailsDrink } />
          <br />
          <span id="btns" />
        </div>
      </div>
      <div className="container-conteudo">
        <p className="titulo-2">Ingredients list</p>
        <div className="opitions-processo container-conteudo-text">
          {arrayIngredients.map((element, index) => {
            const checked = arrayCheckBox.some((checkElement) => checkElement === element);
            return (
              <label
                htmlFor={ index }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                name={ index }
                className={ checked ? 'riscado' : 'non-riscado' }
              >
                <input
                  type="checkbox"
                  id={ index }
                  name="scales"
                  checked={ checked }
                  onChange={ (event) => riskCheckBox(event, element) }
                />
                { element }
              </label>
            );
          })}
        </div>
        <p className="titulo-2">Instructions</p>
        <div className="container-conteudo-text">
          <p
            className="instructions-text"
            data-testid="instructions"
          >
            {detailsDrink.strInstructions}
          </p>
        </div>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ arrayIngredients.length !== countCheck }
        onClick={ () => onClickDone() }
        className="btn-finalizar"
      >
        Finalizar receita
      </button>
    </div>
  );
}

ProcessoBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape.isRequired,
};

export default ProcessoBebida;
