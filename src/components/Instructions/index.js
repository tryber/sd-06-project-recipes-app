import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Instructions = () => {
  const { detailsInfo } = useContext(ContextAPI);
  const path = window.location.href;

  return (
    <div
      className="container-instructions"
      data-testid="instructions"
    >
      {detailsInfo.foods && (
        <div>
          <span>Instructions</span>
          <div className="text-instructions">
            {path.includes('comidas') ? detailsInfo.foods.strInstructions
              : detailsInfo.drinks.strInstructions}
          </div>
        </div>)}
    </div>
  );
};

export default Instructions;
