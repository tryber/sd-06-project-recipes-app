import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import './styles.css';

function Navbar() {
  return (
    <nav className="app-nav-bar" data-testid="footer">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks page" />
      </Link>

      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore page" />
      </Link>

      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="meals page" />
      </Link>
    </nav>
  );
}

export default Navbar;
