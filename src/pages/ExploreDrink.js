import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowCircleRight,
  faQuestion } from '@fortawesome/free-solid-svg-icons';

import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApiDrink from '../services/FetchApiDrink';

import {
  ExploreContainer,
  ExploreDrinkByIngredient,
  ExploreDrinkByRandom } from '../styles/exploreFoodDrinkBy';

function ExploreDrink() {
  const {
    drinkDetail,
    setDrinkDetail,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiDrink('8', setDrinkDetail);
  }, []);

  function randomRecipe() {
    const id = drinkDetail.map((drink) => drink.idDrink);
    window.location.pathname = `/bebidas/${id}`;
  }

  return (
    <div>
      <Header />
      <ExploreContainer>

        <ExploreDrinkByIngredient
          type="button"
          data-testid="explore-drink"
        >
          <div>
            <span>
              <h1>Explorar bebidas por ingrediente</h1>
              <Link to="/explorar/bebidas/ingredientes">
                <FontAwesomeIcon icon={ faArrowCircleRight } />
              </Link>
            </span>
          </div>
        </ExploreDrinkByIngredient>

        <ExploreDrinkByRandom
          type="button"
          data-testid="explore-drink"
          onClick={ () => randomRecipe() }
        >
          <div>
            <span>
              <h1>Me surpreenda !</h1>
              <Link
                to="/explorar/bebidas/ingredientes"
              >
                <FontAwesomeIcon icon={ faQuestion } />
              </Link>
            </span>
          </div>
        </ExploreDrinkByRandom>

      </ExploreContainer>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
