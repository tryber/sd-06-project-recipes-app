import React from 'react';
import { Link } from 'react-router-dom';

import '../style/footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (

    <div
      data-testid="footer"
      className="footer"
    >
      <footer>
        <Link to="/bebidas">
          <button
            aria-label="drinks-btn"
            type="button"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
          >
            <img alt="bla" src={ drinkIcon } />
          </button>
        </Link>
        <Link to="/explorar">
          <button
            aria-label="explore-btn"
            type="button"
            src={ exploreIcon }
            data-testid="explore-bottom-btn"
          >
            <img alt="bla" src={ exploreIcon } />
          </button>
        </Link>
        <Link to="/comidas">
          <button
            aria-label="meal-btn"
            type="button"
            src={ mealIcon }
            data-testid="food-bottom-btn"
          >
            <img alt="bla" src={ mealIcon } />
          </button>
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
