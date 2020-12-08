import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button
          className="footer-btn"
          type="button"
        >
          <img
            alt="drinks section"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          />
        </button>
      </Link>

      <Link to="/explorar">
        <button
          className="footer-btn"
          type="button"
        >
          <img
            alt="explore section"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
          />
        </button>
      </Link>

      <Link to="/comidas">
        <button
          className="footer-btn"
          type="button"
        >
          <img
            alt="food section"
            data-testid="food-bottom-btn"
            src={ mealIcon }
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
