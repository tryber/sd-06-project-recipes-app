import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Style/Footer.css';

const Footer = () => (
  <footer
    data-testid="footer"
    style={ { position: 'fixed', bottom: '0px', width: '100%' } }
    // className="container-footer"
  >
    <nav className="container-footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="Drinks page"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Explore page"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="Meals page"
          data-testid="food-bottom-btn"
        />
      </Link>
    </nav>
  </footer>
);

export default Footer;
