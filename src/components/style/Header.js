import styled from 'styled-components';

 const HeaderContainer = styled.div`
  margin-bottom: 25px;
  background-color: var(--blue-header);
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 18px;

  div {
   display: flex;
   justify-content: space-between;
   margin: auto;
   width: 90%;
   align-items: center;

   a {
    align-self: flex-start;
   }

   button {
    align-self: flex-end;
    background: none;
    border: none;
   }
  }
 `;

export default HeaderContainer;