import React from 'react';
import './styles.css';

import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => (
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

export default Footer;
