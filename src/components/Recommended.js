import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchRecommended } from '../services/api';

function Recommended() {
  const location = useLocation().pathname;
  const [recommended, setRecommended] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const url = (location.match(/comidas/g) ? drinksURL : mealsURL);
  const recommendations = ((location.match(/comidas/g) ? 'drinks' : 'meals'));
  const type = ((location.match(/comidas/g) ? 'Drink' : 'Meal'));

  useEffect(() => {
    (async () => {
      const recipes = await fetchRecommended(url);
      const min = 0;
      const max = 6;
      setRecommended(recipes[recommendations].slice(min, max));
      setIsFetching(false);
    })();
  }, []);

  const renderRecommended = () => (
    <div className="cards-container">
      {recommended.map((item, id) => {
        const visible = 2;
        if (id < visible) {
          return (
            <Link
              to={ (type === 'Meal') ? `/comidas/${item.idMeal}` : `/bebidas/${item.idDrink}` }
              key={ id }
              className="recipe-card"
              data-testid={ `${id}-recomendation-card` }
              value={ item.strCategory }
              style={ { visibility: 'visible' } }
            >
              <img
                className="card-img"
                src={ item[`str${type}Thumb`] }
                alt={ item[`str${type}`] }
                data-testid={ `${id}-card-img` }
              />
              <h3 data-testid={ `${id}-recomendation-title` }>{item[`str${type}`]}</h3>
            </Link>
          );
        }
        return (
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recomendation-card` }
            value={ item.strCategory }
            style={ { visibility: 'hidden' } }
          >
            <img
              className="card-img"
              src={ item[`str${type}Thumb`] }
              alt={ item[`str${type}`] }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-recomendation-title` }>{item[`str${type}`]}</h3>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <h5 className="recommended-text">
        Recomendações:
      </h5>
      <div>
        {(isFetching) ? <div>Carregando</div>
          : (
            renderRecommended()
          )}
      </div>
    </div>
  );
}

export default Recommended;
