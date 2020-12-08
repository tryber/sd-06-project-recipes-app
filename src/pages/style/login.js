import styled from 'styled-components';

export const LoginContainer = styled.div`
  align-items: center;
  background-color: rgb(217, 227, 231, 0.7);
  border-radius: 5%;
  display: flex;
  height: 250px;
  flex-direction: column;
  margin: 25% auto;
  width: 60%;

  div {
    margin: 10px 0;
  }
`;

export const LoginInput = styled.input`
  background-size: 200px 100%;
  background: linear-gradient(to bottom,
  rgba(255, 255, 255, 0) 96%,
  var(--input-color) 4%) no-repeat -200px 0;
  border: none;
  /* color: darken(#1abc9c, 20%); */
  color: darken(var(--input-color), 20%);
  display: block;
  font-size: 14px;
  padding: 20px 0;
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  width: 200px;

  &:focus:valid {
    background-position: 0 0;
    box-shadow: none;
    font-size: 14px;
    outline: none;
    font-weight: 700;
  }

  &::placeholder {
    color: var(--input-color);

    font-size: 16px;
  }

  &:focus::placeholder {
    color: var(--input-color);
    transform: translateY(-20px);
  }
`;

export const SubmitButton = styled.button`
  background: var(--input-color);
  border-radius: 3px;
  border: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  color: grey;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  padding: 6px;
  width: 200px;

  ${({ disabled }) => !disabled
    && `
  color: var(--background-color);
  &:hover {
    box-shadow: 0 6px 6px 0 rgba(0,0,0,0.2);
    transform: translateY(-3px);
  }`}
`;
