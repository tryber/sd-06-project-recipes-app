import styled from 'styled-components';

export const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5%;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: rgba(255,255,255, 0.7);
    width: 150px;
    height: 150px;
    margin: 2%;
    text-decoration: none;
  }

  a:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0, 0.7);
  }

  p {
    text-align: center;
    color: whitesmoke;
    font-family: Foodpacker;
    font-size: 0.9em;
    margin: 0;
    padding: 0;
  }

  img {
    width: 100px;
    height: 100px;
  }
`;
