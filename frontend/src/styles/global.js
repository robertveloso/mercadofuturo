import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import bgImage from '../assets/images/bg.png';
// import bgImage from '../assets/images/background.svg';
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
    /*background: rgb(28,52,106);
    background: -moz-linear-gradient(150deg, rgba(28,52,106,1) 0%, rgba(22,64,158,1) 32%, rgba(28,76,188,1) 66%);
    background: -webkit-linear-gradient(150deg, rgba(28,52,106,1) 0%, rgba(22,64,158,1) 32%, rgba(28,76,188,1) 66%);
    background: linear-gradient(150deg, rgba(28,52,106,1) 0%, rgba(22,64,158,1) 32%, rgba(28,76,188,1) 66%);
    background: url(${bgImage}) center top no-repeat;
    background-size: contain;*/
    background: #ebebeb;
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    height: 100%;
    margin: 0 auto;
    /*max-width: 1020px;
    padding: 0 20px 50px;*/
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
