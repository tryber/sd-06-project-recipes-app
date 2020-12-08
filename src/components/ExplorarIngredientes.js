import React from 'react';

function ExplorarIngredientes(elemento, index) {
  return (
    <div
      key={ elemento.index }
      data-testid={ `${index}-ingredient-card` }
      className="Card"

    >

      <h3 data-testid={ `${index}-card-name` }>titulo card </h3>

      <img alt="ingrediente" data-testid={ `${index}-card-img` } />
    </div>
  );
}

export default ExplorarIngredientes;
