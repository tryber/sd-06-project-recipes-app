import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import drinkIcon from '../../images/drinkIcon.svg';
import drinkActive from '../../images/drinkActive.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import exploreActive from '../../images/exploreActive.svg';
import mealIcon from '../../images/mealIcon.svg';
import mealActive from '../../images/mealActive.svg';
import logoutIcon from '../../images/logoutIcon.svg';

function Footer() {
  const { setPageTitle, navFooter, setNavFooter } = useContext(Context);
  return (
    <div className="container-icons-footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          onClick={ () => {
            setPageTitle('Drinks');
            setNavFooter('drink');
          } }
        >
          <img
            src={ (navFooter === 'drink') ? drinkActive : drinkIcon }
            alt="drinks"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          onClick={ () => {
            setPageTitle('Explore');
            setNavFooter('explore');
          } }
        >
          <img
            src={ (navFooter === 'explore') ? exploreActive : exploreIcon }
            alt="explore"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          onClick={ () => {
            setPageTitle('Meals');
            setNavFooter('meal');
          } }
        >
          <img
            src={ (navFooter === 'meal') ? mealActive : mealIcon }
            alt="foods"
          />
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          src={ logoutIcon }
        >
          <img
            src={ logoutIcon }
            alt="Home icon"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
