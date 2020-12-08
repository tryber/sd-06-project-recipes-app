import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../css/Cards.css';

function DoneRecipeCard({ recipe, index }) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  const { setFavoriteList } = useContext(RecipesContext);

  const [showMessage, setShowMessage] = useState(false);

  const CopiedLinkMessage = (
    <div className="copy-message-hidden">
      <span>
        Link copiado!
      </span>
    </div>
  );

  const preTitle = () => {
    if (type === 'bebida') {
      return alcoholicOrNot;
    }
    return `${area} - ${category}`;
  };

  const shareClick = () => {
    const timeToShow = 1500;
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeToShow);
  };

  const removeFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = currentFavorite.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavoriteList(newFavorite);
  };

  return (
    <div className="done-recipe-card-container">
      <div className="done-recipe-img-container">
        <Link to={ `/${type}s/${id}` }>
          <img
            alt="prato já feito"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      { showMessage && CopiedLinkMessage }
      <div className="done-recipe-info-container">
        <h3 data-testid={ `${index}-horizontal-top-text` }>{ preTitle() }</h3>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
      </div>
      <div>
        <button type="button" onClick={ () => shareClick() }>
          <img
            alt="share button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <button type="button" onClick={ () => removeFavorite() }>
          <img
            alt="favorite button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          />
        </button>
      </div>
    </div>
  );
}

export default DoneRecipeCard;

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
