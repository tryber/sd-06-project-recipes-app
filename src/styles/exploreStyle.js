import styled from 'styled-components';
import foodExplore from '../images/foodExplore.jpg';
import drinksExplore from '../images/drinksExplore.jpg';

export const ExploreContainer = styled.section`
  display: flex;
  height: 79vh;  
`;

export const ExploreFood = styled.section`
  width: 50%;
  background-image: url(${foodExplore});
  background-size: cover;

  div {
    position: absolute;
    left: 0;
    top: 13%;
    background-color: black;
    width: 50%;
    height: 79vh;
    color: whitesmoke;
    opacity: 0;
  }

  h1 {
    position: relative;
    font-size: 2.1em;
    top: 30%;
    left: 25%;
  }

  div:hover {
    background-color: black;
    opacity: 0.7;
  }

  a {
    position: absolute;
    right: 40%;
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

export const ExploreDrink = styled.section`
width: 50%;
background-image: url(${drinksExplore});
background-size: cover;

div {
  position: absolute;
  right: 0;
  top: 13%;
  background-color: black;
  width: 50%;
  height: 79vh;
  color: whitesmoke;
  opacity: 0;
}

h1 {
  position: relative;
  font-size: 2.1em;
  top: 30%;
  left: 25%;
}

div:hover {
  background-color: black;
  opacity: 0.7;
}

a {
  position: absolute;
  right: 40%;
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
