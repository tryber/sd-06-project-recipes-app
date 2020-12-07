import styled from 'styled-components';

export const CardDetailsContainer = styled.section`
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
  margin 5%;

  h2 {
    font-size: 4.4em;
    font-family: Foodpacker;
    margin: 0;
    padding: 0;
  }

  h4 {
    font-size: 1.6em;
    font-family: Foodpacker;
  }

  img {
    border-radius: 50%;
    height: 300px;
    width: 300px;
    margin: 0;
  }

  p {
    line-height: 1.3em;
    font-family: 'Droid Serif', serif;
  }

  ul {
    font-family: 'Droid Serif', serif;
    color: whitesmoke;
    font-weight: bold;
  }

  .BrainhubCarousel__arrows {
    background-color: rgba(212,42,42, 0.2);
    border-radius: 50%;
  }
  
  .BrainhubCarousel__arrows:hover {
      background-color: rgba(255,255,255,0.1)
    }
  }
`;

export const ButtonsRecipe = styled.button`
    outline: none;
    background: transparent;
    border: 1px solid whitesmoke;
    color: whitesmoke;
    border-radius: 10px;
    margin-top: 5%;
    margin-left: 1%;
    font-size: 1.8em;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

  &:hover{
    border: none;
    background-color: whitesmoke;
    color: rgb(131, 24, 24);
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
`;

export const ShareAndLikeButtons = styled.section`
  width: 100%;

  .btn-share .btn-favorite-right {
    font-size: 1.5em;
  }

  .btn-favorite-right {
    position: absolute;
    right: 5%;
  }
`;
