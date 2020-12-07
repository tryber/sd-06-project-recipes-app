import styled from 'styled-components';

export const CardContainer = styled.section`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 5%;

  div {
    margin: 5% 1% 1% 2%;
    background-color: rgba(255,255,255, 0.7);
    width: 310px;
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

export const CustomSelect = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 3%;

  select {
    outline: none;
    box-shadow: none;
    border: 0 !important;
    background: rgb(131, 24, 24);
    width: 20em;
    height: 3em;
    line-height: 3;
    font-size: 0.8em;
    overflow: hidden;
    border-radius: 0.25em;
    color: whitesmoke;
  }

  // select option {
  //   text-align: center !important;
  //   border: 1px solid blue;
  // }
`;
