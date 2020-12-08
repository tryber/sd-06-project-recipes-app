import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --input-color: #36a4fe;
    --background-color: #fef9f6;
    --blue-color: #365efe;
    --light-blue: #cdd3ed;
    --blue-header: #90a1f3;
    --button-background: #548cf5;
  }

  body {
    background: #fef9f6;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
