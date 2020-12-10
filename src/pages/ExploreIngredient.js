import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import RevenueContext from '../context/RevenueContext';

export default function ExploreIngredient() {
  const location = useLocation();
  const title = location.pathname.split('/')[2];

  const { setexternFetchLink } = useContext(RevenueContext);

  const [ingredients, setingredients] = useState();

  const fetchIngredients = async () => {
    let linkAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    if (title === 'bebidas') linkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

    const data = await fetch(linkAPI);
    const json = await data.json();
    const jsonIngredients = (title === 'comidas')
      ? json.meals
      : json.drinks;
    setingredients(jsonIngredients);
  };

  useEffect(() => { fetchIngredients(); }, []);

  const filterByIngredient = (ingredientName) => {
    if (title === 'comidas') {
      setexternFetchLink(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
      return '/comidas';
    }
    setexternFetchLink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    return '/bebidas';
  };

  const renderIngredients = () => (
    ingredients.map((ingredient, index) => {
      const DOZE = 12;
      let ingredientName;
      let baseApi;
      if (title === 'comidas') {
        ingredientName = ingredient.strIngredient;
        baseApi = 'themealdb';
      } else {
        ingredientName = ingredient.strIngredient1;
        baseApi = 'thecocktaildb';
      }
      if (index < DOZE) {
        return (
          <div
            key={ index }
            className="cardIngredients"
            data-testid={ `${index}-ingredient-card` }
          >
            <Link
              className="imageCardIngredients"
              to={ () => filterByIngredient(ingredientName) }
            >
              <img
                src={ `https://www.${baseApi}.com/images/ingredients/${ingredientName}-Small.png` }
                alt={ ingredientName }
                data-testid={ `${index}-card-img` }
              />
              <h5 data-testid={ `${index}-card-name` } className="name-recipe-explore">
                {ingredientName}
              </h5>
            </Link>
          </div>
        );
      }
      return null;
    })
  );

  return (
    <div className="ingredients-explore">
      {(ingredients) ? renderIngredients() : <Loading />}
    </div>
  );
}
