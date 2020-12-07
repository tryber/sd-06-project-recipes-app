import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer-container">
      <img
        className="footer-item"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drink"
        onClick={ () => history.push('/bebidas') }
        aria-hidden="true"
      />
      <img
        className="footer-item"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="explore"
        onClick={ () => history.push('/explorar') }
        aria-hidden="true"
      />
      <img
        className="footer-item"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="meal"
        onClick={ () => history.push('/comidas') }
        aria-hidden="true"
      />
    </div>
  );
}

export default Footer;
