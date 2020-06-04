import React from 'react';
import { Link } from 'react-router-dom';

import { MdPersonOutline } from 'react-icons/md';

import { Container, Links, Cart } from './styles';

// import logo from '../../assets/images/logo.svg';
import logo from '../../assets/images/LOGO_BRANCA.png';

export default function Header() {
  return (
    <>
      <Container>
        <Link to="/">
          <img src={logo} width={180} alt="Mercado Futuro" />
        </Link>
        <header>
          <Links to="/">
            <div>
              <strong>Início</strong>
            </div>
          </Links>
          <Links to="/empresas">
            <div>
              <strong>Empresas</strong>
            </div>
          </Links>
          <Links to="/sobre">
            <div>
              <strong>Sobre</strong>
            </div>
          </Links>

          <Cart to="/login">
            <div>
              <strong>Login</strong>
            </div>

            <MdPersonOutline size={36} color="#fff" />
          </Cart>
        </header>
      </Container>
    </>
  );
}
