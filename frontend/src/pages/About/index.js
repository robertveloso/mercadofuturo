import React from 'react';

import { FaShoppingBag, FaChartBar } from 'react-icons/fa';

import {
  AboutContainer,
  AboutBanner,
  AboutImage,
  AboutItems,
  AboutItem,
  AboutItemIcon,
  AboutItemInfos,
  AboutItemTitle,
  AboutItemDescriptionList,
  AboutItemDescription,
} from './styles';
import {
  Container,
  Section,
  Subsection,
  Title,
  Subtitle,
  Text,
} from '../../styles/dstyles';

export default function About() {
  return (
    <Container>
      <AboutContainer>
        <Section>
          <div className="row">
            <div className="col-lg-6 col-12 text-lg-left text-center">
              <Title>
                Seu investimento <span>agora</span> pode garantir o{' '}
                <span>futuro</span> desses pequenos negócios!
              </Title>
            </div>
            <div className="col-lg-6 d-lg-flex d-none justify-content-center align-items-center">
              <AboutBanner />
            </div>
          </div>
        </Section>
      </AboutContainer>
      <Section>
        <Subsection>
          <Subtitle>Sobre o Mercado Futuro</Subtitle>
          <Text>
            Plataforma em que os pequenos negócios podem levantar saldo para
            capital através da venda de vouchers pré-pagos com bonificação aos
            seus clientes.
          </Text>
        </Subsection>
        <div className="row mt-5">
          <div className="col-lg-6 col-12">
            <Text>Por que escolher um mercado futuro?</Text>
            <AboutItems>
              <AboutItem>
                <AboutItemIcon>
                  <FaShoppingBag />
                </AboutItemIcon>
                <AboutItemInfos>
                  <AboutItemTitle>Para os clientes:</AboutItemTitle>
                  <AboutItemDescriptionList>
                    <AboutItemDescription>
                      Ajudar e valorizar os negócios locais;
                    </AboutItemDescription>
                    <AboutItemDescription>
                      Programar compras futuras;
                    </AboutItemDescription>
                    <AboutItemDescription>
                      Ganhar bônus superiores ao rendimento da poupança em suas
                      compras.
                    </AboutItemDescription>
                  </AboutItemDescriptionList>
                </AboutItemInfos>
              </AboutItem>
              <AboutItem>
                <AboutItemIcon>
                  <FaChartBar />
                </AboutItemIcon>
                <AboutItemInfos>
                  <AboutItemTitle>Para as empresas:</AboutItemTitle>
                  <AboutItemDescriptionList>
                    <AboutItemDescription>
                      Acesso a dinheiro rápido, menos burocrático e mais barato
                      que em bancos.
                    </AboutItemDescription>
                  </AboutItemDescriptionList>
                </AboutItemInfos>
              </AboutItem>
            </AboutItems>
          </div>
          <div className="col-lg-6 d-lg-flex d-none justify-content-center align-items-center">
            <AboutImage />
          </div>
        </div>
      </Section>
    </Container>
  );
}
