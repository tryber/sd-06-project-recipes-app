import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, exploreIcon, mealIcon } from '../images';
import '../style/Footer.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          className="button-drink"
          data-testid="drinks-bottom-btn"
          type="button"
          src={ drinkIcon }
        >
          <img
            className="image"
            src={ drinkIcon }
            alt="Ícone bebidas"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          className="button-explore"
          data-testid="explore-bottom-btn"
          type="button"
          src={ exploreIcon }
        >
          <img
            className="image"
            src={ exploreIcon }
            alt="Ícone explorar"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          className="button-food"
          data-testid="food-bottom-btn"
          type="button"
          src={ mealIcon }
        >
          <img
            className="image"
            src={ mealIcon }
            alt="Ícone comida"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
