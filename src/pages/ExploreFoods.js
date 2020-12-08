import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import fetchRecipes from '../services';

function ExploreFoods() {
  const { setHeader } = useContext(AppContext);
  const [randomId, setRandomId] = useState('');

  const getRandomId = async () => {
    const recipe = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/random.php');
    const id = recipe.meals[0].idMeal;
    setRandomId(id);
  };
  useEffect(() => {
    setHeader({ page: 'Explorar Comidas', search: false });
    getRandomId();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex-column-container">
        <hr />
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="categ-buttons"
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <hr />
        <Link to="/explorar/comidas/area">
          <button className="categ-buttons" data-testid="explore-by-area" type="button">
            Por Local de Origem
          </button>
        </Link>
        <hr />
        <Link to={ `/comidas/${randomId}` }>
          <button className="categ-buttons" data-testid="explore-surprise" type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default ExploreFoods;
