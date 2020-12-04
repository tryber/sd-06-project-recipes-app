import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, mealIcon, exploreIcon } from '../images';

function Footer() {
  return (
    <footer data-testid="footer" className="footerComponent">
      <nav>
        <Link to="/bebidas">
          <p src={ drinkIcon } data-testid="drinks-bottom-btn">
            Drinks
            <img
              src={ drinkIcon }
              alt="Imagem de drink"
              height="25"
            />
          </p>
        </Link>
        <Link to="/comidas">
          <p src={ mealIcon } data-testid="food-bottom-btn">
            Comidas
            <img
              src={ mealIcon }
              alt="Imagem de alimento"
              height="25"
            />
          </p>
        </Link>
        <Link to="/explorar">
          <p src={ exploreIcon } data-testid="explore-bottom-btn">
            Explore
            <img
              src={ exploreIcon }
              alt="Explore o Site"
              height="25"
            />
          </p>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
