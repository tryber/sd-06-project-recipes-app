import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 0 auto;
  height: 500px;
  width: 350px;
`;

export const Logo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 265px;
`;

export const LoginContent = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const InputContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
`;

export const InputLogin = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10%;
  padding-left: 20%;
  font-size: 1.5em;
  border: 1px solid rgb(212,42,42);
  color:  rgb(131, 24, 24);
  background: rgba(255,255,255, 0.7);
`;

export const Icon = styled.span`
  position: absolute;
  color: rgb(131, 24, 24);
  margin: -7% 0px 0px -55%;
`;

export const LoginButton = styled.button`
    background-color: rgb(212,42,42);
    text-align: center;
    color: rgb(131, 24, 24);
    border: none;
    font-size: 1.8em;
    cursor: pointer;
    outline: none;

    span {
      position: absolute;
      left: 20%;
      bottom: 8%;
      color: rgb(131,24,24);
    }
`;
