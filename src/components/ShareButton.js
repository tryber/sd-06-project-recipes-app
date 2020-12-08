import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

export default function ShareButton({ index, id, type }) {
  const [alert, setAlert] = useState();
  // console.log(type);
  function shareRecipeLink() {
    const drinkOrFood = (type === 'Meal' || type === 'comida')
      ? '/comidas/' : '/bebidas/';
    const time = 5000;
    navigator.clipboard.writeText(`http://localhost:3000${drinkOrFood}${id}`);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, time);
  }

  return (
    <button className="button-standard" type="button" onClick={ () => shareRecipeLink() }>
      <img
        src={ ShareIcon }
        alt="Share Button"
        data-testid={ `${index}-horizontal-share-btn` }
      />
      {alert && <alert>Link copiado!</alert>}
    </button>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
