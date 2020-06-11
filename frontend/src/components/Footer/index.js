import React from 'react';

import { FooterText } from './styles';
import { Container, Section } from '../../styles/dstyles';

import picpay from '../../assets/images/picpay.png';

function Footer() {
  return (
    <Container>
      <Section>
        <FooterText>
          © Copyright 2020 Time 4 - HackaTrouble - Todos os direitos reservados.
        </FooterText>
        <span
          style={{
            color: '#283335',
            fontSize: '36px',
            lineHeight: '48px',
          }}
        >
          Parceiros
        </span>
        <img src={picpay} width={180} alt="PicPay" />
      </Section>
    </Container>
  );
}

export default Footer;
