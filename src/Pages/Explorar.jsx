import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../Components';
import '../Style/explore.css';
import exploreFood from '../images/exploreFood.png';
import exploreDrinks from '../images/exploreDrinks.png';

function Explorar() {
  return (
    <div className="explore">
      <Header pageName="Explore" />
      <Link to="/explorar/comidas" data-testid="explore-food" className="explore-btn">
        Explore Foods
        <img src={ exploreFood } alt="Explore food icon" />
      </Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks" className="explore-btn">
        Explore Drinks
        <img src={ exploreDrinks } alt="Explore drinks icon" />
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
