import React from 'react';

function CardBebida(elemento, index) {
  return (
    <div key={ elemento.idDrink } data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{ elemento.strDrink }</h4>
      <img
        data-testid={ `${index}-card-img` }
        src={ elemento.strDrinkThumb }
        alt={ elemento.strDrink }
      />
    </div>
  );
}

export default CardBebida;
