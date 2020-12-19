import React from 'react';

function CardComida(elemento, index) {
  return (
    <div key={ elemento.idMeal } data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{ elemento.strMeal }</h4>
      <img
        data-testid={ `${index}-card-img` }
        src={ elemento.strMealThumb }
        alt={ elemento.strMeal }
      />
    </div>
  );
}

export default CardComida;
