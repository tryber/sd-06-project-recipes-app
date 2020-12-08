import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import '../Css/Menu.css';

function Menu() {
  return (
    <div className="app-recipe">
      <div className="menu-main-container">
        <div className="header">
          <Header />
        </div>
        <div className="recipe-list">
          <RecipeList />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Menu;
