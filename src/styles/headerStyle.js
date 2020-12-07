import styled from 'styled-components';

export const HeaderContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
`;

export const HeaderTitle = styled.h1`
  font-family: 'Foodpacker';
  font-size: 50px;
  color: rgb(212,42,42);
  padding: 0;
  margin: 0;
`;

export const IconStyle = styled.span`
  color: rgb(212,42,42);
  cursor: pointer;

  a:link {
    color: rgb(212,42,42);
  }
  
  a:visited {
    color: rgb(212,42,42);
  }
  
  a:hover {
    color: rgb(212,42,42);
  }
  
  a:active {
    color: rgb(212,42,42);
  }
`;
