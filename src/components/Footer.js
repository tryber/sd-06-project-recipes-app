import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../visual_identity/styles/2.Layout/Footer.css';

const Footer = () => (
  <div data-testid="footer" className="position-fixed-bottom">
    <Link to="/bebidas">
      <button
        type="button"
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />
      </button>
    </Link>
    <Link to="/explorar">
      <button
        type="button"
      >
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="" />
      </button>
    </Link>
    <Link to="/comidas">
      <button
        type="button"
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="" />
      </button>
    </Link>
  </div>
);

export default Footer;
