import styled from 'styled-components';

const FooterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;

  div {
    background-color: var(--blue-header);
    position: fixed;
    bottom: 0;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 100%;
    align-items: center;

    a {
      align-self: flex-start;
      margin: 0 15px;
    }

    button {
      align-self: flex-end;
    }
  }
`;

export default FooterContainer;