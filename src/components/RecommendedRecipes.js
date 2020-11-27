import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import RevenueContext from '../context/RevenueContext';
// TIREI O BOOTSTRAP DO CAROUSEL DAQUI
// https://getbootstrap.com/docs/4.0/components/carousel/#with-controls
// O MAP QUE FORMOS FAZER TEM QUE PEGAR AS PRIMEIRAS 6 RECEITAS QUE ENCONTRAR DA API

export default function RecommendedRecipes() {
  const { recommendations, fetchRecommendations,
    searchParam } = useContext(RevenueContext);
  const ZERO = 0;
  const SETE = 7;

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
      <div>
        <Carousel activeIndex={ index } onSelect={ handleSelect }>
          {recommendations.map((recommendedItem, i) => {
            if (i < SETE) {
              return (
                <Carousel.Item>
                  <div className="d-flex row-cols-2 align-content-around">
                    <div>
                      <img
                        width="150px"
                        src={ recommendedItem[`str${recommendParam}Thumb`] }
                        alt={ recommendedItem[`str${recommendParam}`] }
                      />
                      <h6 data-testid="recipe-category">
                        { searchParam === 'Drink'
                          ? recommendedItem.strCategory
                          : recommendedItem.strAlcoholic }
                      </h6>
                      <h1>{ recommendedItem[`str${recommendParam}`] }</h1>
                    </div>
                    <div>
                      <img
                        width="150px"
                        src={ recommendedItem[`str${recommendParam}Thumb`] }
                        alt={ recommendedItem[`str${recommendParam}`] }
                      />
                      <h6 data-testid="recipe-category">
                        { searchParam === 'Drink'
                          ? recommendedItem.strCategory
                          : recommendedItem.strAlcoholic }
                      </h6>
                      <h1>{ recommendedItem[`str${recommendParam}`] }</h1>
                    </div>
                  </div>

                </Carousel.Item>
              );
            }
            return null;
          })}
        </Carousel>
        {/* TALVEZ AQUI TEM QUE SER ITEM-ATCTIVE PARA MOSTRAR OS 2 DOIS NA TELA */}

        {/* NO CASO DE BEBIDAS A CATEGORIA VAI SER
            SUBSTITUIDA P ALCOOLICO OU NAO strAlcoholic */}

        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
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
