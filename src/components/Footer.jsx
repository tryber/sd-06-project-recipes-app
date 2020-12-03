import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../styles/images/mealIcon.svg';
import drinkIcon from '../styles/images/drinkIcon.svg';
import exploreIcon from '../styles/images/exploreIcon.svg';

import '../styles/components.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </div>
  );
}

export default Footer;
