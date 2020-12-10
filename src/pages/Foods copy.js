import React, { useContext, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

export default function Foods() {
  const { foods, fetchApi, searchParam,
    isLoading, externFetchLink, setexternFetchLink } = useContext(RevenueContext);
  const TWELVE = 12;
  const TWO = 2;
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
    <Container>
      {(foods && foods.length === 1 && !foods[0][`str${searchParam}`].match(/Goat/))
        ? <Redirect to={ `/${foodOrDrink}/${idFirstPosition}` } /> : null}
      {foods && foods.map((food, index) => {
        const id = food[`id${searchParam}`];
        if (index < TWELVE && (index % TWO === ZERO) && (index < foods.length)) {
          let id1;
          if (index === foods.length - 1) {
            id1 = null;
          } else { id1 = index + 1; }
          return (
            <Row>
              <Col>
                <Link to={ `/${foodOrDrink}/${id}` }>
                  <Card
                    key={ id }
                    data-testid={ `${index}-recipe-card` }
                    className="card-recipe-style"
                  >
                    <Card.Img
                      src={ foods[index][`str${searchParam}Thumb`] }
                      alt={ foods[index][`str${searchParam}`] }
                      data-testid={ `${index}-card-img` }
                    />
                    <Card.Title data-testid={ `${index}-card-name` }>
                      {foods[index][`str${searchParam}`]}
                    </Card.Title>
                  </Card>
                </Link>
              </Col>
              <Col>
                {
                  (id1 !== null)
                    ? (
                      <Link to={ `/${foodOrDrink}/${foods[id1][`id${searchParam}`]}` }>
                        <Card
                          key={ foods[id1][`id${searchParam}`] }
                          data-testid={ `${id1}-recipe-card` }
                        >
                          <Card.Img
                            src={ foods[id1][`str${searchParam}Thumb`] }
                            alt={ foods[id1][`str${searchParam}`] }
                            data-testid={ `${id1}-card-img` }
                          />
                          <Card.Title data-testid={ `${id1}-card-name` }>
                            {foods[id1][`str${searchParam}`]}
                          </Card.Title>
                        </Card>
                      </Link>)
                    : ''
                }
              </Col>
            </Row>
          );
        }
        return null;
      })}
    </Container>
  );

  const renderIngredients = () => (
    <Container>
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
    </Container>
  );

  if (!isLoading) {
    return (
      <div className="wrap-food">
        {(searchParam === 'Ingredients') ? renderIngredients() : renderFoodOrDrink()}
      </div>
    );
  }
  return <Container><div>Loading...</div></Container>;
}
