import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { ExploreContainer, ExploreFood, ExploreDrink } from '../styles/exploreStyle';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header />
      <ExploreContainer>

        <ExploreFood
          type="button"
          data-testid="explore-food"
        >
          <div>
            <span>
              <h1>Explorar comidas</h1>
              <Link to="/explorar/comidas">
                <FontAwesomeIcon icon={ faArrowCircleLeft } />
              </Link>
            </span>
          </div>
        </ExploreFood>

        <ExploreDrink
          type="button"
          data-testid="explore-drink"
        >
          <div>
            <span>
              <h1>Explorar bebidas</h1>
              <Link to="/explorar/bebidas">
                <FontAwesomeIcon icon={ faArrowCircleRight } />
              </Link>
            </span>
          </div>
        </ExploreDrink>

      </ExploreContainer>
      <Footer />
    </div>
  );
}

export default Explore;
