import React, { useEffect, useState } from 'react';
import { requestApiFoodDetails, requestApiFoodFilterIngredient } from '../services/requestFood';

function DetalhesReceita(props) {
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [embed, setEmbed] = useState('');
  const [recommendFood, setRecommendFood] = useState([]);

  useEffect(() =>{
    requestApiFoodDetails(props.match.params.id)
      .then((response) => {
        setDetailsFood(response[0]);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    ingredientsFunc();
    embedVideo();
    recommendFoodFunction();
  }, [detailsFood])

  const embedVideo = () => {
    const youtubeVideo = detailsFood.strYoutube;
    if (youtubeVideo != undefined) {
      const newYoutube = youtubeVideo.split("=")
      setEmbed(newYoutube[newYoutube.length-1]);
    }
  }

  const ingredientsFunc = () => {
    if(detailsFood.length !== 0) {
      const array = []
      for(let i=1;i<=20;i++) {
        const ingredient = detailsFood[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element!=='')
      setArrayIngredients(arrayReturn);
    } 
  }

  const recommendFoodFunction = async () => {
    if (detailsFood.length !== 0) {
      const response = await requestApiFoodFilterIngredient(detailsFood.strIngredient1);
      setRecommendFood(response.slice(0,6));
    }
  }

  if (detailsFood.length === 0)  {
    return <div>Loading...</div>
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={detailsFood.strMealThumb} />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
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
      <iframe 
        data-testid="video" 
        width="1042" height="586"
        src={`https://www.youtube.com/embed/${embed}`}
        frameborder="0" allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowfullscreen>
      </iframe>
      <div>
        {recommendFood.map((food, index) => {
          return (
            <div data-testid={`${index}-recomendation-card`}>
              <img src={food.strMealThumb} />
              <h3>{food.strMeal}</h3>
            </div>
          )
        })}
      </div> 
    </div>
  );
}

export default DetalhesReceita;
