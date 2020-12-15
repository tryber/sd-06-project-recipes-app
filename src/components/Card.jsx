import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ imagePath, itemName, id, itemType, indexId, cardType }) {
  return (
    <div data-testid={ `${indexId}-${cardType}-card` } className="card-container">
      <div className="card-datails">
        <Link className="card-details-link" to={ `/${itemType}/${id}` }>
          <img
            data-testid={ `${indexId}-card-img` }
            alt="recipe cover"
            className="card-image"
            src={ imagePath }
          />
          <div data-testid={ `${indexId}-card-name` } className="card-info">
            <h4 className="card-title">{itemName}</h4>
          </div>
          {id && <button type="button" className="card-ver-receita">ver receita</button>}
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  imagePath: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemType: propTypes.string.isRequired,
  indexId: propTypes.number.isRequired,
  cardType: propTypes.string.isRequired,
};

export default Card;
