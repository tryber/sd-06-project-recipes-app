import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import HeaderExplorePages from '../components/HeaderExplorePages';
import Footer from '../components/Footer';

import { requestRandomDrink } from '../services/requestsAPI';

function ExploreDrinksPage() {
  const history = useHistory();
  // const [randomRecipe, setRandomRecipe] = useState([]);
  async function handleClick() {
    const resultRandom = await requestRandomDrink();
    // setRandomRecipe(resultRandomFood);
    console.log(resultRandom);
    history.push(`/bebidas/${resultRandom.drinks[0].idDrink}`);
  }

  return (
    <div>
      <HeaderExplorePages pageName="Explorar Bebidas" />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="category-button"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <button
          className="category-button"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>

      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksPage;
