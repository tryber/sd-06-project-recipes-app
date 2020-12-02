import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import food from '../images/mealIcon.svg';
import './style/style.css';

export default function Footer() {
  return (
    <footer className="d-flex" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          src={ drinks }
          alt="drinks"
          data-testid="drinks-bottom-btn"
          className="btn-warning"
        >
          <img src={ drinks } alt="drnks" />
        </button>
      </Link>
      <div className="space bg-warning" />
      <Link to="/explorar">
        <button
          type="button"
          src={ explore }
          alt="explore"
          data-testid="explore-bottom-btn"
          className="btn-warning"
        >
          <img src={ explore } alt="drnks" />
        </button>
      </Link>
      <div className="space bg-warning" />

      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ food }
          alt="food"
          className="btn-warning"
        >
          <img src={ food } alt="drnks" />
        </button>
      </Link>
    </footer>
  );
}
