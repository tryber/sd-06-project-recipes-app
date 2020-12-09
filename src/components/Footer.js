import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  const { setFilters } = useContext(RecipesContext);
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    // Precisa desse style pra passar no cypress
  };

  return (
    <footer data-testid="footer" style={ footerStyle } className="footer-container">
      <Link
        to="/bebidas"
        onClick={ () => setFilters({
          searchText: '',
          searchType: 'name',
          category: 'bebidas',
        }) }
      >
        <img
          src={ drinkIcon }
          alt="Ícone de drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Explore icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link
        to="/comidas"
        onClick={ () => setFilters({
          searchText: '',
          searchType: 'name',
          category: 'comidas',
        }) }
      >
        <img
          src={ mealIcon }
          alt="Meal icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
