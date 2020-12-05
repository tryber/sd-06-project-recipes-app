import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import food from '../images/mealIcon.svg';
import './style/style.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          src={ drinks }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          src={ explore }
          alt="explore"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ food }
          alt="food"
        />
      </Link>
    </footer>
  );
}
