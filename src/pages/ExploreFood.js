import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowCircleRight,
  faArrowCircleLeft,
  faQuestion } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApiFood from '../services/FetchApiFood';
import RecipesContext from '../context/RecipesContext';

import {
  ExploreContainer,
  ExploreFoodByIngredient,
  ExploreFoodByArea,
  ExploreFoodByRandom } from '../styles/exploreFoodDrinkBy';

function ExploreFood() {
  const {
    foodDetail,
    setFoodDetail,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiFood('10', setFoodDetail);
  }, []);

  function randomRecipe() {
    const id = foodDetail.map((food) => food.idMeal);
    window.location.pathname = `/comidas/${id}`;
  }

  return (
    <div>
      <Header />
      <ExploreContainer>

        <ExploreFoodByIngredient
          type="button"
          data-testid="explore-food"
        >
          <div>
            <span>
              <h1>Explorar comidas por ingrediente</h1>
              <Link to="/explorar/comidas/ingredientes">
                <FontAwesomeIcon icon={ faArrowCircleRight } />
              </Link>
            </span>
          </div>
        </ExploreFoodByIngredient>

        <ExploreFoodByArea
          type="button"
          data-testid="explore-food"
        >
          <div>
            <span>
              <h1>Por Local de Origem</h1>
              <Link to="/explorar/comidas/area">
                <FontAwesomeIcon icon={ faArrowCircleLeft } />
              </Link>
            </span>
          </div>
        </ExploreFoodByArea>

        <ExploreFoodByRandom>
          <div>
            <span>
              <h1>Me Surpreenda!</h1>
              <Link
                to="/explorar/comidas/area"
                type="button"
                data-testid="explore-surprise"
                onClick={ () => randomRecipe() }
              >
                <FontAwesomeIcon icon={ faQuestion } />
              </Link>
            </span>
          </div>
        </ExploreFoodByRandom>

      </ExploreContainer>
      <Footer />
    </div>
  );
}

export default ExploreFood;
