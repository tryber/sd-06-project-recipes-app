import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import RevenueContext from '../context/RevenueContext';
// TIREI O BOOTSTRAP DO CAROUSEL DAQUI
// https://getbootstrap.com/docs/4.0/components/carousel/#with-controls
// O MAP QUE FORMOS FAZER TEM QUE PEGAR AS PRIMEIRAS 6 RECEITAS QUE ENCONTRAR DA API

export default function RecommendedRecipes() {
  const { recommendations, fetchRecommendations,
    searchParam } = useContext(RevenueContext);
  const ZERO = 0;
  const FIVE = 5;
  const TWO = 2;

  const [index, setIndex] = useState(ZERO);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const linkRecommendationsAPI = (searchParam === 'Meal')
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetchRecommendations(linkRecommendationsAPI);
  }, []);

  const renderRecommendations = () => {
    const recommendParam = (searchParam === 'Meal') ? 'Drink' : 'Meal';
    return (
      <div className="carousel">
        <Carousel activeIndex={ index } onSelect={ handleSelect }>
          {recommendations.map((recommendedItem, i) => {
            if (i < FIVE && (i % TWO === ZERO)) {
              return (
                <Carousel.Item>
                  <div className="d-flex row-cols-2 justify-content-around">
                    <Card data-testid={ `${i}-recomendation-card` }>
                      <Card.Img
                        src={ recommendations[i][`str${recommendParam}Thumb`] }
                        alt={ recommendations[i][`str${recommendParam}`] }
                      />
                      <Card.Body>
                        <Card.Title data-testid={ `${i}-recomendation-title` }>
                          <h3>
                            { recommendations[i][`str${recommendParam}`] }
                          </h3>
                        </Card.Title>
                        <Card.Text>
                          <h6 data-testid="recipe-category">
                            { searchParam === 'Drink'
                              ? recommendations[i].strCategory
                              : recommendations[i].strAlcoholic }
                          </h6>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card Card data-testid={ `${i + 1}-recomendation-card` }>
                      <Card.Img
                        src={ recommendations[i + 1][`str${recommendParam}Thumb`] }
                        alt={ recommendations[i + 1][`str${recommendParam}`] }
                      />
                      <Card.Body>
                        <Card.Title data-testid={ `${i + 1}-recomendation-title` }>
                          <h3>
                            { recommendations[i + 1][`str${recommendParam}`] }
                          </h3>
                        </Card.Title>
                        <Card.Text>
                          <h6 data-testid="recipe-category">
                            { searchParam === 'Drink'
                              ? recommendations[i + 1].strCategory
                              : recommendations[i + 1].strAlcoholic }
                          </h6>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Carousel.Item>
              );
            }
            return null;
          })}
        </Carousel>
      </div>
    );
  };

  return (
    <div>
      {(recommendations) ? renderRecommendations() : 'Loading...'}
    </div>
  );
}

// A pagina de detalhes de receita deverá fazer um API de search para renderizar as tags
// 36 - Implemente as recomendações, para receitas de comida, a recomendação deverá ser bebida e vice-versa
// Observações técnicas

// Verifica se a requisição para a API de bebidas foi realizada. O endpoint utilizado deve ser
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=;
// Verifica se a requisição para a API de comidas foi realizada. O endpoint utilizado deve ser
//  https://www.themealdb.com/api/json/v1/1/search.php?s=.

// 37 - Implemente os cards de recomendação, onde serão 6 cards, mas mostrando apenas 2 e o
// scroll é horizontal, similar a um carousel
