import styled from "styled-components";

export const TitleContainer = styled.div`
  background-color: var(--blue-header);
  display: flex;
  font-size: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;  
  width: 90%;
  
  .recipe-container {
    margin: 20px;
    display: flex;
    justify-content: center;
    width: 90%; 
    
    & button {      
      border: none;
      background: none;
    }
    .recipe-photo {
      width: 30%;
      height: auto;
      border-radius: 50%;
      margin-right: 15px;
    }
    
    .buttons-recipe {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }
  }
`;

export const IngredientsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 120px;
  width: 60%;
  
  & p {
    border: 1px solid black;
  }
`;

export const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 50px;
  text-align: justify;
  margin-bottom: 48px;
`;

export const FooterContainer = styled.div`
  background-color: var(--blue-header);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  bottom: 0px;
  position: fixed;

  & button {
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
