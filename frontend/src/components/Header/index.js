import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdPersonOutline } from 'react-icons/md';

import { Container, Links, Cart, Countdown } from './styles';

// import logo from '../../assets/images/logo.svg';
import logo from '../../assets/images/LOGO_BRANCA.png';

export default function Header() {
  const calculateTimeLeft = () => {
    const difference = +new Date('2020-06-20') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <>
        {timeLeft[interval]} {interval}{' '}
      </>
    );
  });

  return (
    <>
      <Container>
        <Link to="/">
          <img src={logo} width={180} alt="Mercado Futuro" />
        </Link>
        <div>
          <Countdown>
            <div>
              <strong>Lançamento</strong>
              {timerComponents.length ? (
                <strong>{timerComponents}</strong>
              ) : (
                <strong>Chegou a hora!</strong>
              )}
            </div>
          </Countdown>
        </div>
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
