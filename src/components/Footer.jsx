import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import FooterContainer from './style/Footer';

class Footer extends Component {
  render() {
    return (
      <FooterContainer data-testid="footer">
        <div>
          <Link to="/bebidas">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks" />
          </Link>
          <Link to="/explorar">
            <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore" />
          </Link>
          <Link to="/comidas">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="Food" />
          </Link>
        </div>
      </FooterContainer>
    );
  }
}

export default Footer;
