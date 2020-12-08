import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MealsContext from '../context/MealsContext';
import '../Css/myCarousel.css';

function MyCarousel() {
  const { recommendedRecipe } = useContext(MealsContext);

  return (
    <Carousel>
      { console.log(recommendedRecipe) }
      <Carousel.Item>
        <div className="carousel-container">
          <div data-testid="0-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[0].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[0].strCategory }</h6>
            <h4 data-testid="0-recomendation-title">{ recommendedRecipe[0].strName }</h4>
          </div>
          <div data-testid="1-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[1].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[1].strCategory }</h6>
            <h4 data-testid="1-recomendation-title">{ recommendedRecipe[1].strName }</h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-container">
          <div data-testid="2-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[2].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[2].strCategory }</h6>
            <h4 data-testid="2-recomendation-title">{ recommendedRecipe[2].strName }</h4>
          </div>
          <div data-testid="3-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[3].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[3].strCategory }</h6>
            <h4 data-testid="3-recomendation-title">{ recommendedRecipe[3].strName }</h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-container">
          <div data-testid="4-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[4].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[4].strCategory }</h6>
            <h4 data-testid="4-recomendation-title">{ recommendedRecipe[4].strName }</h4>
          </div>
          <div data-testid="5-recomendation-card">
            <img
              className="d-block w-100"
              src={ recommendedRecipe[5].strThumb }
              alt="First slide"
            />
            <h6>{ recommendedRecipe[5].strCategory }</h6>
            <h4 data-testid="5-recomendation-title">{ recommendedRecipe[5].strName }</h4>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

// MyCarousel.propTypes = {
//   cards: PropTypes.arrayOf(PropTypes.shape({
//     strThumb: PropTypes.string.isRequired,
//     strName: PropTypes.string.isRequired,
//     strCategory: PropTypes.string.isRequired,
//   })).isRequired,
// };

export default MyCarousel;
