import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import './Card.css';

function CardBebida(elemento, index) {
  const { setIdBebida } = useContext(RecipeContext);
  const history = useHistory();

  function redirectDetails(idDrink) {
    setIdBebida(idDrink);
    history.push(`/bebidas/${idDrink}`);
  }
  // console.log(index);
  return (
    <div key={ elemento.idDrink } data-testid={ `${index}-recipe-card` } className="Card">
      <button type="button" onClick={ () => redirectDetails(elemento.idDrink) }>
        <h4
          data-testid={ `${index}-card-name` }
          className="Title"
        >
          { elemento.strDrink }
        </h4>
        <img
          data-testid={ `${index}-card-img` }
          src={ elemento.strDrinkThumb }
          alt={ elemento.strDrink }
        />
      </button>

    </div>
  );
}

export default CardBebida;
