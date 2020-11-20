import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <button type="button">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink-icon"
          />
          Drinks
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="explore-icon"
          />
          Explore
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="meal-icon"
          />
          Foods
        </button>
      </Link>
    </div>
  );
}

export default Footer;
