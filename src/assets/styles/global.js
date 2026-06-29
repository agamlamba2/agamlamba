import { createGlobalStyle } from 'styled-components';
import colors from './variables/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html,
  body,
  #root {
    height: 100%;
    font-family: 'Inter', 'Segoe UI', Verdana, Arial, sans-serif;
    background: ${colors.bgColor};
    color: ${colors.text.light.medium};
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  input,
  button {
    font: 16px 'Inter', 'Segoe UI', Verdana, Arial, sans-serif;
  }

  *:focus {
    outline: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ::selection {
    background: ${colors.accent};
    color: ${colors.bgColor};
  }
`;
