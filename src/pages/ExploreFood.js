import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

export default function ExploreFoods() {
  const location = useLocation();
  const title = location.pathname.split('/')[2];

  const [random, setrandom] = useState();

  useEffect(() => {}, [random]);

  const fetchRamdom = async () => {
    let linkAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
    if (title === 'bebidas') linkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    const data = await fetch(linkAPI);
    const json = await data.json();
    const id = (title === 'comidas') ? json.meals[0].idMeal : json.drinks[0].idDrink;
    setrandom(`/${title}/${id}`);
  };

  return (
    <div>
      {(random) ? <Redirect to={ random } /> : null}
      <Link to={ `/explorar/${title}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      {(title === 'comidas') ? (
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>)
        : ''}
      <Link to={ `/explorar/${title}` }>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ fetchRamdom }
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}
