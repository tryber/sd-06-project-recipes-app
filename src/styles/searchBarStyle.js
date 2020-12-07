import styled from 'styled-components';

export const SearchBarContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CustomSearchInput = styled.input`
  margin: 3% auto 2%;
  border: none;
  border-radius: 10px;
  height: 20px;
  font-size: 1.2em;
  color: rgb(131, 24, 24);
  padding: 3%;
  width: 100%;

  &::placeholder {
    text-align: justify;
    color: rgb(131, 24, 24)
  }
`;

export const CustomRadioContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  color: whitesmoke;
  margin: 3%;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  input:checked ~ span{
    background-color: rgb(131, 24, 24);
  }

  input:hover ~ span{
    height: 15px;
    width: 15px;
    background-color: rgb(131, 24, 24);
  }
`;

export const CheckMarkRadio = styled.span`
  position: absolute;
  left: 35%;
  height: 15px;
  width: 15px;
  background-color: #eee;
  border-radius: 50%;
`;

export const ButtonSearch = styled.button`
  outline: none;
  background: transparent;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  border-radius: 10px;
  margin-top: 5%;
  margin-left: 1%;
  font-size: 1.5em;
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
