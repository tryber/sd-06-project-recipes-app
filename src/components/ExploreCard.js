import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ info, index }) {
  const { idMeal, strMeal, strMealThumb } = info;
  const previewThumb = `${strMealThumb}/preview`;

  return (
    <Link to={ `/comidas/${idMeal}` }>
      <div
        className="recipe-card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ previewThumb }
          className="thumbnail"
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
        />
        <p
          className="recipe-card-name"
          data-testid={ `${index}-card-name` }
        >
          { strMeal }
        </p>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Cards;
