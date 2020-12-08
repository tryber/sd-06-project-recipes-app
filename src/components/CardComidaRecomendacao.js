import React from 'react';
import { useHistory } from 'react-router-dom';
import './Card.css';

function CardComidaRecomendacao(elemento, index) {
  const history = useHistory();
  function redirectDetails(idMeal) {
    history.push(`/comidas/${idMeal}`);
  }
  return (
    <div key={ elemento.idMeal } data-testid={ `${index}-recipe-card` } className="Card">
      <button
        type="button"
        onClick={ () => redirectDetails(elemento.idMeal) }
      >
        <h4
          data-testid={ `${index}-recomendation-title` }
          className="Title"
        >
          { elemento.strMeal }
        </h4>
        <img
          data-testid={ `${index}-card-img` }
          src={ elemento.strMealThumb }
          alt={ elemento.strMeal }
        />
      </button>
    </div>
  );
}

export default CardComidaRecomendacao;
