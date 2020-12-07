import styled from 'styled-components';

import foodExplore from '../images/foodExplore.jpg';
import surpriseFood from '../images/surprise_food.png';
import foodByCountry from '../images/foodByCountry.jpg';

import drinksExplore from '../images/drinksExplore.jpg';
import surpriseDrink from '../images/surprise_drink.jpg';

export const ExploreContainer = styled.section`
  // display: flex;
  // height: 79vh;  
`;

export const ExploreFoodByIngredient = styled.section`
  height: 33vh;
  background-image: url(${foodExplore});
  background-size: cover;

  div {
    position: absolute;
    left: 0;
    top: 13%;
    background-color: black;
    height: 33vh;
    color: whitesmoke;
    opacity: 0;
  }

  h1 {
    text-align: center;
    font-size: 2.1em;
    top: 15%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 45%;
    top: 60%;
    font-size: 3.5em;
    font-family: 'Droid Serif', serif;
  }
 
  a:link {
    color: whitesmoke;
  }
  
  a:visited {
    color: whitesmoke;
  }
  
  a:hover {
    color: whitesmoke;
    opacity: 0.9;
  }
  
  a:active {
    color: whitesmoke;
  }
`;

export const ExploreFoodByArea = styled.section`
  height: 33vh;
  background-image: url(${foodByCountry});
  background-size: cover;

  div {
    position: absolute;
    left: 0;
    top: 46%;
    background-color: black;
    height: 33vh;
    width: 100%;
    color: whitesmoke;
    opacity: 0;
  }

  h1 {
    text-align: center;
    font-size: 2.1em;
    top: 15%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 45%;
    top: 60%;
    font-size: 3.5em;
    font-family: 'Droid Serif', serif;
  }
 
  a:link {
    color: whitesmoke;
  }
  
  a:visited {
    color: whitesmoke;
  }
  
  a:hover {
    color: whitesmoke;
    opacity: 0.9;
  }
  
  a:active {
    color: whitesmoke;
  }
`;

export const ExploreFoodByRandom = styled.section`
  height: 33vh;
  background-image: url(${surpriseFood});
  background-size: cover;
  background-position: 10%;

  div {
    position: absolute;
    left: 0;
    top: 79%;
    background-color: black;
    height: 33vh;
    width: 100%;
    color: whitesmoke;
    opacity: 0;
  }

  h1 {
    text-align: center;
    font-size: 2.1em;
    top: 15%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 45%;
    top: 40%;
    font-size: 3.5em;
    font-family: 'Droid Serif', serif;
  }
 
  a:link {
    color: whitesmoke;
  }
  
  a:visited {
    color: whitesmoke;
  }
  
  a:hover {
    color: whitesmoke;
    opacity: 0.9;
  }
  
  a:active {
    color: whitesmoke;
  }
`;

export const ExploreDrinkByIngredient = styled.section`
  height: 40vh;
  background-image: url(${drinksExplore});
  background-size: cover;

  div {
    position: absolute;
    left: 0;
    top: 13%;
    background-color: black;
    height: 40vh;
    color: whitesmoke;
    opacity: 0;
  }

  h1 {
    text-align: center;
    font-size: 2.1em;
    top: 15%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 45%;
    top: 60%;
    font-size: 3.5em;
    font-family: 'Droid Serif', serif;
  }
 
  a:link {
    color: whitesmoke;
  }
  
  a:visited {
    color: whitesmoke;
  }
  
  a:hover {
    color: whitesmoke;
    opacity: 0.9;
  }
  
  a:active {
    color: whitesmoke;
  }
`;

export const ExploreDrinkByRandom = styled.section`
  height: 40vh;
  background-image: url(${surpriseDrink});
  background-size: cover;
  background-position: center;

  div {
    position: absolute;
    left: 0;
    top: 52.5%;
    background-color: black;
    height: 40vh;
    color: whitesmoke;
    opacity: 0;
    width: 100%;
  }

  h1 {
    text-align: center;
    font-size: 2.1em;
    top: 15%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 45%;
    top: 60%;
    font-size: 3.5em;
    font-family: 'Droid Serif', serif;
  }
 
  a:link {
    color: whitesmoke;
  }
  
  a:visited {
    color: whitesmoke;
  }
  
  a:hover {
    color: whitesmoke;
    opacity: 0.9;
  }
  
  a:active {
    color: whitesmoke;
  }
`;
