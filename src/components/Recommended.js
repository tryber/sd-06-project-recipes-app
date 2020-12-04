import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRecommended } from '../services/api';
import './Recommended.css';

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
            <div
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
            </div>
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
    <section>
      <h5>
        Recomendações
      </h5>
      {(isFetching) ? <div>Carregando</div>
        : (
          renderRecommended()
        )}
    </section>
  );
}

export default Recommended;
