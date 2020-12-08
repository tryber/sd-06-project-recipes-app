import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../css/footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" replace>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </Link>
      <Link to="/explorar" replace>
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
      </Link>
      <Link to="/comidas" replace>
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </Link>
    </footer>
  );
}

export default Footer;
