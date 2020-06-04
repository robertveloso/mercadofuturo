import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import bgImage from '../assets/images/bg.png';
//import background from '../assets/images/background.svg';
// background: #ECF4FF url(${background}) no-repeat center top;
// background: #191920
export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #ECF4FF url(${bgImage}) no-repeat center top -200px;
    background-size: contain;
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    height: 100%;
    min-height: 700px; /* check alternative */
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  .fade.modal.show {
    padding: 0 .5rem;
  }
  .modal-dialog, .modal-content {
    margin: 0;
    padding: 0;
  }
  .modal-dialog {
    max-width: initial;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: transparent;
    border: 0;
    width: auto;
  }

  button {
    cursor: pointer;
  }
`;
