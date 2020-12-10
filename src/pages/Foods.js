import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import RevenueContext from '../context/RevenueContext';

export default function Foods() {
  const { foods, fetchApi, searchParam,
    isLoading, externFetchLink, setexternFetchLink } = useContext(RevenueContext);
  const TWELVE = 12;
  const ZERO = 0;

  useEffect(() => {
    if (!externFetchLink) {
      if (searchParam === 'Meal') {
        fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else if (searchParam === 'Drink') {
        fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
    } else {
      fetchApi(externFetchLink);
    }

    return () => {
      setexternFetchLink(undefined);
    };
  }, [searchParam]);

  const foodOrDrink = (searchParam === 'Meal') ? 'comidas' : 'bebidas';
  const idFirstPosition = (foods && foods.length !== ZERO)
    ? foods[0][`id${searchParam}`]
    : null;
  const renderFoodOrDrink = () => (
    <>
      {(foods
        && foods.length === 1
        && !foods[0][`str${searchParam}`].match(/Goat/))
        ? <Redirect to={ `/${foodOrDrink}/${idFirstPosition}` } /> : null}
      {foods && foods.map((food, index) => {
        const id = food[`id${searchParam}`];
        if (index < TWELVE && (index < foods.length)) {
          return (
            <Link to={ `/${foodOrDrink}/${id}` }>
              <div
                key={ id }
                data-testid={ `${index}-recipe-card` }
                className="card-recipe-style"
              >
                <img
                  src={ foods[index][`str${searchParam}Thumb`] }
                  alt={ foods[index][`str${searchParam}`] }
                  data-testid={ `${index}-card-img` }
                  className="img-recipe-thumb"
                />
                <h3 data-testid={ `${index}-card-name` } className="name-recipe-thumb">
                  {foods[index][`str${searchParam}`]}
                </h3>
              </div>
            </Link>
          );
        }
        return null;
      })}
    </>);

  const renderIngredients = () => (
    <>
      {foods.map((food, index) => {
        if (index < TWELVE) {
          return (
            <div key={ food.idIngredient }>
              <h3>{ food.strIngredient }</h3>
              <p>{food.strDescription}</p>
            </div>
          );
        }
        return '';
      })}
    </>
  );

  if (!isLoading) {
    return (
      <div className="wrap-food">
        {(searchParam === 'Ingredients') ? renderIngredients() : renderFoodOrDrink()}
      </div>
    );
  }
  return <Loading />;
}
