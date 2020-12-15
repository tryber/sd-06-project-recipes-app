import React from 'react';
import { Link } from 'react-router-dom';
import { DrinkIcon, MealIcon, ExploreIcon } from '../images';

const linkElement = (imgSrc, linkTestId, url) => (
  <Link
    to={ url }
    data-testid={ linkTestId }
    src={ imgSrc }
    alt=""
    style={ { height: '50px', width: '50px' } }
    className="footer-icon"
  >
    <img src={ imgSrc } alt="" />
  </Link>
);

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <section className="footer-icons">
        { linkElement(DrinkIcon, 'drinks-bottom-btn', '/bebidas', 'bebidas') }
        { linkElement(ExploreIcon, 'explore-bottom-btn', '/explorar', 'explore') }
        { linkElement(MealIcon, 'food-bottom-btn', '/comidas', 'comidas') }
      </section>
    </footer>
  );
}

export default Footer;
