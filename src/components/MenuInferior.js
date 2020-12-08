import React from 'react';
import { useHistory } from 'react-router-dom';
import FoodImage from '../images/mealIcon.svg';
import DrinkImage from '../images/drinkIcon.svg';
import ExploreImage from '../images/exploreIcon.svg';
import Mais from '../images/mais.png';
import './MenuInferior.css';

function MenuInferior() {
  const history = useHistory();
  function redirectComidas() {
    history.push('/comidas');
  }
  function redirectBebidas() {
    history.push('/bebidas');
  }
  function redirectExplorar() {
    history.push('/explorar');
  }
  function redirectNovaReceita() {
    history.push('/nova-receita');
  }
  return (
    <div data-testid="footer" className="MenuInferior">

      <button
        className="buttonFooter"
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ redirectBebidas }
        src={ DrinkImage }
      >
        <img src={ DrinkImage } alt="drink-img" />
        Bebidas
      </button>

      <button
        className="buttonFooter"
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ redirectExplorar }
        src={ ExploreImage }
      >
        <img src={ ExploreImage } alt="explore-img" />
        Explorar
      </button>

      <button
        className="buttonFooter"
        type="button"
        data-testid="food-bottom-btn"
        onClick={ redirectComidas }
        src={ FoodImage }
      >
        <img src={ FoodImage } alt="food-img" />
        Comidas
      </button>

      <button
        className="buttonFooter"
        type="button"
        onClick={ redirectNovaReceita }
        src={ Mais }
      >
        <img src={ Mais } alt="plus-img" />
        Nova Receita
      </button>
    </div>
  );
}
export default MenuInferior;
