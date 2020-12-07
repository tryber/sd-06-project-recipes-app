import styled from 'styled-components';

export const FilterButtonsContainer = styled.section`
  display: flex;
  justify-content: center;
  
  button{
    outline: none;
    background: transparent;
    border: 1px solid whitesmoke;
    color: whitesmoke;
    border-radius: 10px;
    margin-top: 5%;
    margin-left: 1%;
    font-size: 14px;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }

  button:hover{
    border: none;
    background-color: whitesmoke;
    color: rgb(131, 24, 24);
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
  }
`;

export const Cards = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5% 2% 0px 2%; 
  max-width: 500px;
  
  div {
    margin: 5% 1% 1% 2%;
    background-color: rgba(255,255,255, 0.7);
    width: 210px;
  }

  div:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0, 0.7);
  }

  p {
    font-family: Foodpacker;
    text-align: center;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }

  img {
    margin: 1%;
    width: 96%;
  }
`;
