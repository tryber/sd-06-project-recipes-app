import React from 'react';
import './footer.css';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <a
        href="/explorar"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ ExploreIcon }
          alt="explore"
        />
      </a>
      <a
        href="/bebidas"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          alt="drink"
        />
      </a>
      <a
        href="/comidas"
      >
        <img
          data-testid="food-bottom-btn"
          src={ MealIcon }
          alt="meal"
        />
      </a>
    </footer>
  );
}

export default Footer;
