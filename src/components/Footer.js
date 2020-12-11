import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <input
          type="image"
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <input
          type="image"
          src={ exploreIcon }
          alt="explore-icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <input
          type="image"
          src={ mealIcon }
          alt="meal-icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
