import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, mealIcon, exploreIcon } from '../../images';
import './style.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <nav className="footer-container">
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Icone bebidas"
          />
        </Link>
        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Icone alimentos"
          />
        </Link>
        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Icone explorar"
          />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
