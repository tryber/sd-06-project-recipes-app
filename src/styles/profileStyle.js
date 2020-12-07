import styled from 'styled-components';

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  margin: 5%;
  background: linear-gradient(180deg, rgba(212,42,42,1) 28%, rgb(221, 94, 94) 100%);
  border-radius: 5px;

  span {
    background-color: whitesmoke;
    border-radius: 50%;
    color: rgb(212,42,42);
  }

  button {
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
  }
`;

export const Title = styled.section`
  color: whitesmoke;
  font-size: 1.5em;
`;
