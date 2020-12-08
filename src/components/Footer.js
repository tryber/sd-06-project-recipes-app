import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../Css/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer-container">
      <Link to="/bebidas">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          className="app-button-transparent"
        >
          <img src={ drinkIcon } alt="DRINKS" />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          className="app-button-transparent"
        >
          <img src={ exploreIcon } alt="EXPLORE" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          className="app-button-transparent"
        >
          <img src={ mealIcon } alt="FOOD" />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
