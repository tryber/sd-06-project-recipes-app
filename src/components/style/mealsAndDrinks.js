import styled from 'styled-components';

export const MealsAndDrinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 90%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  
  div {
    margin: 0 2%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5%;
  width: 100%;

  div {
    align-content: center;
    background-color: var(--light-blue);
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2%;
    height: 170px;
    width: 40%;
    flex-wrap: wrap;

    &:nth-last-child(-n + 2) {
      margin-bottom: 80px;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    width: 80%;
  }

  img {
    align-self: center;
    border-radius: 50%;
    margin-bottom: 8%;
    width: 80%;
  }

  p {
    text-align: center;
    align-self: center;
    font-size: 18px;
    color: #121350;
    text-shadow: 1px -1px #121350;
    width: auto;
  }
`;

export const FilterButtons = styled.div`
  button {
    width: fit-content;
    padding: 8px;
    font-size: 14px;
    border: none;
    border-radius: 5%;
    background-color: var(--button-background);
    color: aliceblue;
    box-shadow: 2px 2px 5px #7aa2e3,
                -2px -2px 5px #7aa2e3;
  }
`;