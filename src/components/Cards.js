import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Cards({
  id, name, category, thumbnail, dataTestID, dataTestIDImg, dataTestIDCard, index,
}) {
  return (
    <Link key={ index } to={ `/bebidas/${id}` }>
      <div className="recipe-card" data-testid={ dataTestID } key={ index }>
        <img
          alt="Drink Thumb"
          data-testid={ dataTestIDImg }
          src={ thumbnail }
          className="recipe-thumb"
          height="250"
        />
        <h3>{category}</h3>
        <h2
          className="recipe-name"
          data-testid={ dataTestIDCard }
        >
          {name}
        </h2>
      </div>
    </Link>
  );
}

// Cards.default.Props = {
//   category: '',
//   index: '',
// };

Cards.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  thumbnail: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  dataTestID: propTypes.string.isRequired,
  dataTestIDImg: propTypes.string.isRequired,
  dataTestIDCard: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
};
