import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import fetchRecipes from '../services';

function ExploreDrinks() {
  const { setHeader } = useContext(AppContext);
  const [randomId, setRandomId] = useState('');

  const getRandomId = async () => {
    const recipe = await fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const id = recipe.drinks[0].idDrink;
    setRandomId(id);
  };

  useEffect(() => {
    setHeader({ page: 'Explorar Bebidas', search: false });
    getRandomId();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex-column-container">
        <hr />
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="categ-buttons"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <hr />
        <Link to={ `/bebidas/${randomId}` }>
          <button className="categ-buttons" data-testid="explore-surprise" type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
