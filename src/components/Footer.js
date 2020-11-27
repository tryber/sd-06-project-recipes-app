import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const [selected, setSelected] = useState('');

  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          className={ selected === 'a' ? 'active' : '' }
          onClick={ () => setSelected('a') }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt=""
            className="footer-icon"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          className={ selected === 'b' ? 'active' : '' }
          onClick={ () => setSelected('b') }
        >
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt=""
            className="footer-icon"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          className={ selected === 'c' ? 'active' : '' }
          onClick={ () => setSelected('c') }
        >
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt=""
            className="footer-icon"
          />
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
