import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="Drink icon" className="header-icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img src={ exploreIcon } alt="exploreIcon" className="header-icon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="mealIcon" className="header-icon" />
      </Link>
    </div>
  );
}

export default Footer;
