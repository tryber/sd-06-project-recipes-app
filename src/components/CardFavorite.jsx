import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteShareButtons from './FavoriteShareButtons';

function Card({ imagePath, itemName, id, itemType, titlePage, pageType,
  indexId, cardType, area, category, alcoholic, date, tagsRecipe }) {
  const iconsAccordingPage = (title) => {
    if (title === 'Receitas Favoritas') {
      return (
        <section className="card-buttons">
          <FavoriteShareButtons
            key={ id }
            recipeId={ id }
            type={ itemType === 'comidas' ? 'meal' : 'drink' }
            testId={ indexId }
            page={ pageType }
          />
        </section>
      );
    }
    return (
      <section className="card-buttons">
        <FavoriteShareButtons
          key={ id }
          recipeId={ id }
          type={ itemType === 'comidas' ? 'meal' : 'drink' }
          testId={ indexId }
          page={ pageType }
        />
      </section>
    );
  };

  const foodOrDrink = () => {
    if (area && category) {
      return (
        <span data-testid={ `${indexId}-${cardType}-top-text` }>
          {`${area} - `}
          {`${category}`}
        </span>
      );
    }
    return (
      <span data-testid={ `${indexId}-${cardType}-top-text` }>
        {alcoholic}
      </span>
    );
  };

  return (
    <div data-testid={ `${indexId}-${cardType}-card` } className="card-container">
      <div className="card-datails">
        <Link className="card-details-link" to={ `/${itemType}/${id}` }>
          <div className="card-info">
            <h4
              data-testid={ `${indexId}-${cardType}-name` }
              className="card-title"
            >
              {foodOrDrink()}
              {' - '}
              {itemName}
            </h4>
            <img
              data-testid={ `${indexId}-${cardType}-image` }
              alt="recipe cover"
              className="card-image"
              src={ imagePath }
            />
            <div className="card-date-container">
              <div
                data-testid={ `${indexId}-${cardType}-done-date` }
                className="card-date"
              >
                {date}
              </div>
            </div>
          </div>
        </Link>
        <div className="card-clickable">
          <div className="card-tags">
            {tagsRecipe}
          </div>
          <div className="card-icons">
            {iconsAccordingPage(titlePage)}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  date: '',
  tagsRecipe: [],
};

Card.propTypes = {
  imagePath: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemType: propTypes.string.isRequired,
  indexId: propTypes.number.isRequired,
  cardType: propTypes.string.isRequired,
  area: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  alcoholic: propTypes.string.isRequired,
  titlePage: propTypes.string.isRequired,
  tagsRecipe: propTypes.arrayOf(propTypes.shape()),
  date: propTypes.string,
  pageType: propTypes.string.isRequired,
};

export default Card;
