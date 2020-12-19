import React, { useEffect, useState } from 'react';
import { requestApiDrinkDetails, requestApiDrinkFilterIngredient } from '../services/requestDrink';

function DetalhesBebida(props) {
  const [detailsDrink, setDetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);

  useEffect(() =>{
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setDetailsDrink(response[0]);
      });
  }, []);

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink])

  const ingredientsFunc = () => {
    if(detailsDrink.length !== 0) {
      const array = []
      for(let i=1;i<=20;i++) {
        const ingredient = detailsDrink[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element!=='')
      setArrayIngredients(arrayReturn);
    } 
  }

  const recommendDrinkFunction = async () => {
    if (detailsDrink.length !== 0) {
      const response = await requestApiDrinkFilterIngredient(detailsDrink.strIngredient1);
      setRecommendDrink(response.slice(0,6));
      console.log(response);
    }
  }

  if (detailsDrink.length === 0)  {
    return <div>Loading...</div>
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={detailsDrink.strDrinkThumb} />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <h3 data-testid="recipe-category">{detailsDrink.strCategory}</h3>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      <button data-testid="start-recipe-btn">Iniciar receita</button>
      {arrayIngredients.map((element, index) => {
        return (
          <h5 
            data-testid={`${index}-ingredient-name-and-measure`} 
            key={index}>
              {element}
          </h5>
        )
      })}
      <div data-testid={`0-recomendation-card`}>
        {recommendDrink.map((drink, index) => {
          return (
            <div key={index} >
              <img src={drink.strDrinkThumb} />
              <h3>{drink.strDrink}</h3>
            </div>
          )
        })}
      </div> 
    </div>
  );
}

export default DetalhesBebida;
