import styled from "styled-components";

const ButtonsContainer = styled.div`
  justify-content: center;
  display: flex;
  width: 90%;
  margin: 30px auto;
  
  a, button {
    margin: 0 10px;
    width: fit-content;
    padding: 8px;
    font-size: 14px;
    border: none;
    text-decoration: none;
    border-radius: 5%;
    background-color: var(--button-background);
    color: aliceblue;
    box-shadow: 2px 2px 5px #7aa2e3,
                -2px -2px 5px #7aa2e3;
  }
`;

export default ButtonsContainer;