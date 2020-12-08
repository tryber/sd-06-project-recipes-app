import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinksIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import RevenueContext from '../context/RevenueContext';

export default function Footer() {
  const { setSearchParam } = useContext(RevenueContext);
  return (
    <footer data-testid="footer">
      <div className="container">
        <div className="row justify-content-around">
          <Link to="/bebidas">
            <a href onClick={ () => setSearchParam('Drink') }>
              <img src={ DrinksIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
            </a>
          </Link>
          <Link to="/explorar">
            <img src={ ExploreIcon } alt="Profile" data-testid="explore-bottom-btn" />
          </Link>
          <Link to="/comidas">
            <a href onClick={ () => setSearchParam('Meal') }>
              <img src={ MealIcon } alt="Profile" data-testid="food-bottom-btn" />
            </a>
          </Link>
        </div>
      </div>
    </footer>);
}
