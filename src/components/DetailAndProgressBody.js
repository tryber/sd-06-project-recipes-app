import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavButton from './FavButton';
import Ingredients from './Ingredients';

function DetailAndProgressBody({ recipe, recommendations, buttonsProps }) {
  const {
    image,
    name,
    isAlcoholic,
    category,
    instructions,
  } = recipe;
  const {
    path,
    id,
    isFav,
    wasCopied,
    setIsFav,
    setWasCopied,
    video,
  } = buttonsProps;
  return (
    <main>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ name }
        className="main-photo"
      />
      <h1 data-testid="recipe-title">{ name }</h1>
      <div>
        <ShareButton setMessage={ setWasCopied } />
        <FavButton
          type={ path }
          isFav={ isFav }
          id={ id }
          setIsFav={ setIsFav }
          recipe={ recipe }
        />
      </div>
      {wasCopied && 'Link copiado!'}
      <p data-testid="recipe-category">
        { isAlcoholic === 'Alcoholic'
          ? isAlcoholic
          : category}
      </p>
      <Ingredients recipe={ recipe } />
      <h4>Instructions</h4>
      <p data-testid="instructions">{ instructions }</p>
      { path === 'comidas'
        ? (
          <div>
            <h4>Video</h4>
            <iframe data-testid="video" src={ video } title="Recipe Video" />
          </div>
        )
        : null}
      <div>
        <h4>Recommendations</h4>
        <div className="recomendation-container">
          {recommendations.map((recommendation, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ recommendation.name }
              className="recomendation-card"
            >
              <img src={ recommendation.image } alt={ recommendation.name } />
              <h4 data-testid={ `${index}-recomendation-title` }>
                {recommendation.name}
              </h4>
            </div>

          ))}
        </div>
      </div>
    </main>
  );
}

DetailAndProgressBody.propTypes = {
  recipe: PropTypes.shape.isRequired,
  buttonsProps: PropTypes.shape.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default DetailAndProgressBody;
