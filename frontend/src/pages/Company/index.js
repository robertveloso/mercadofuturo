import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input';

import {
  FaFacebook,
  FaTwitterSquare,
  FaWhatsapp,
  FaInstagram,
  FaGlobe,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaGem,
  FaArrowAltCircleLeft,
  FaPhone,
} from 'react-icons/fa';

import {
  BackButton,
  CompanyDetailsContainer,
  CompanyDetails,
  CompanyDetailsTop,
  CompanyDetailsTitle,
  CompanyDetailsSocialNetworks,
  CompanyDetailsSocialNetworksItem,
  CompanyDetailsImage,
  CompanyDetailsDescription,
  CompanyDetailsInfos,
  CompanyDetailsInfosItem,
  Button,
  VoucherModal,
  VoucherMonthBonus,
  MonthList,
  MonthItem,
  Bonus,
  TooltipRange,
  InputRange,
  LabelRangeValuesList,
  LabelRangeValue,
  DonateContainer,
  DonateTitle,
  DonateText,
  DonateValueContainer,
  DonateValueText,
  DonateInput,
  InputContainer,
  InputTitle,
  InputText,
  InputValueContainer,
  InputValueText,
  InputValue,
} from './styles';

import { Container, Section, Text, ButtonOutline } from '../../styles/dstyles';

import api from '../../services/api';

import { addToCartRequest } from '../../store/modules/cart/actions';

export default function CompaniesDetails() {
  const dispatch = useDispatch();
  const { companySlug } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('companies');

      const data = response.data.map(company => ({
        ...company,
      }));
      setCompany(data.find(item => item.slug === companySlug));
    }
    loadProducts();
  }, [companySlug]);

  const [show, setShow] = useState(false);
  const [monthSelected, setMonthSelected] = useState(0);
  const [rangeValue, setRangeValue] = useState(10);
  const [discountValue, setDiscountValue] = useState(0);
  const [donateValue, setDonateValue] = useState(0);
  const minimumDonateValue = 'R$5,00';

  useEffect(() => {
    setDiscountValue(
      parseFloat(
        rangeValue -
          rangeValue * (monthSelected / 100) -
          (donateValue >= 5 ? 0.1 : 0)
      ).toFixed(2)
    );
  }, [monthSelected, rangeValue, donateValue]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (type, value) => {
    if (type === 'month') {
      setMonthSelected(value);
    } else {
      setRangeValue(value);
    }
  };

  const options = [10, 1000];
  const months = [
    'Maio 2020',
    'Junho 2020',
    'Julho 2020',
    'Agosto 2020',
    'Setembro 2020',
    'Outubro 2020',
    'Novembro 2020',
    'Dezembro 2020',
  ];

  const formatPrice = price => {
    return parseFloat(
      price
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')
    );
  };

  const handleBlur = value => {
    if (formatPrice(value) > 0 && formatPrice(value) < 5) {
      // value = minimumDonateValue;
      toast.error('Valor mínimo de doação R$5,00.');
    }
    setDonateValue(formatPrice(value));
  };

  const addToCart = (id, month, price, discount, donate) => {
    if (donateValue > 0 && donateValue < formatPrice(minimumDonateValue)) {
      toast.error('Valor mínimo de doação R$5,00.');
      return;
    }
    dispatch(addToCartRequest(id, month, price, discount, donate));
    handleClose();
    // call dispatch here
    // setVouchersCount(vouchersCount + 1);
  };

  return (
    <>
      <Container>
        <Section>
          <BackButton>
            <Link to="/empresas">
              <FaArrowAltCircleLeft />
            </Link>
          </BackButton>
          {company && (
            <CompanyDetailsContainer>
              <CompanyDetails>
                <CompanyDetailsTop>
                  <CompanyDetailsTitle>{company.name}</CompanyDetailsTitle>
                  <CompanyDetailsSocialNetworks>
                    <CompanyDetailsSocialNetworksItem>
                      <a
                        href="https://www.facebook.com"
                        title="Acessar Facebook"
                      >
                        <FaFacebook />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a
                        href="https://www.instagram.com"
                        title="Acessar Instagram"
                      >
                        <FaInstagram />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a href="https://www.twitter.com" title="Acessar Twitter">
                        <FaTwitterSquare />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a
                        href="https://api.whatsapp.com"
                        title="Acessar WhatsApp"
                      >
                        <FaWhatsapp />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                  </CompanyDetailsSocialNetworks>
                </CompanyDetailsTop>
                <CompanyDetailsImage src={company?.user?.avatar?.url} />
                <CompanyDetailsDescription>
                  {company.description}
                </CompanyDetailsDescription>
                <CompanyDetailsInfos>
                  <CompanyDetailsInfosItem>
                    <FaMapMarkerAlt />
                    Endereço:{' '}
                    <a
                      href={company.address_map}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.address}
                    </a>
                  </CompanyDetailsInfosItem>
                  <CompanyDetailsInfosItem>
                    <FaGlobe />
                    Site:{' '}
                    <a
                      href={company.site}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.site}
                    </a>
                  </CompanyDetailsInfosItem>
                  <CompanyDetailsInfosItem>
                    <FaPhone />
                    Telefone:{' '}
                    <a
                      href={`tel:+55${company.phone.replace(/([() -])/g, '')}`}
                    >
                      {company.phone}
                    </a>
                  </CompanyDetailsInfosItem>
                </CompanyDetailsInfos>
              </CompanyDetails>
            </CompanyDetailsContainer>
          )}
          <Button onClick={handleShow}>Gerar voucher</Button>
        </Section>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <VoucherModal>
          <Text>1. Escolha o mês para poder usar seu voucher</Text>
          <VoucherMonthBonus>
            <MonthList>
              {months.map((month, index) => {
                return (
                  <MonthItem
                    className={monthSelected === index + 1 ? 'active' : ''}
                    onClick={() => handleChange('month', index + 1)}
                    key={index}
                  >
                    {month}
                  </MonthItem>
                );
              })}
            </MonthList>
            <Bonus>
              <FaGem />
              <Text>Bônus</Text>
              <Text id="bonusPercentage">{`${parseInt(
                monthSelected + (donateValue >= 5 ? 1 : 0)
              )}%`}</Text>
              <Text id="bonusTotal">{`Você vai pagar R$${rangeValue} pelo seu voucher de R$${
                rangeValue
                  ? rangeValue + rangeValue * (monthSelected / 100)
                  : rangeValue
              }.
              `}</Text>
            </Bonus>
          </VoucherMonthBonus>
          <Text>2. Escolha um valor para seu voucher</Text>
          <TooltipRange options={options} rangeValue={rangeValue}>
            {`R$${rangeValue}`}
          </TooltipRange>
          <InputRange
            name="range"
            values={options}
            title={rangeValue}
            value={rangeValue}
            onChange={event =>
              handleChange('price', parseInt(event.target.value))
            }
          />

          <LabelRangeValuesList>
            {options.map((option, index) => {
              return (
                <LabelRangeValue
                  key={index}
                  onClick={() => handleChange('price', option)}
                >
                  {`R$${option}`}
                </LabelRangeValue>
              );
            })}
          </LabelRangeValuesList>
          <InputContainer>
            <InputValueText>Informe o valor do voucher:</InputValueText>
            <InputValue>
              <CurrencyInput
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                value={rangeValue}
                onChange={value => {
                  value > 10
                    ? setRangeValue(formatPrice(value))
                    : toast.error('Valor mínimo de R$ 10,00.', {
                        toastId: 'valor-minimo',
                      });
                }}
                onBlur={ev => handleBlur(ev.target.value)}
              />
            </InputValue>
          </InputContainer>
          {/*<DonateContainer>
            <DonateTitle>Quero doar</DonateTitle>
            <DonateText>
              Faça uma doação para ajudar no combate ao Covid-19 e ganhe um
              bônus extra no seu voucher.
            </DonateText>
            <DonateValueContainer>
              <DonateValueText>Informe o valor para doação:</DonateValueText>
              <DonateInput>
                <CurrencyInput
                  prefix="R$"
                  decimalSeparator=","
                  thousandSeparator="."
                  value={donateValue}
                  onChange={value => {
                    setDonateValue(formatPrice(value));
                  }}
                  onBlur={ev => handleBlur(ev.target.value)}
                />
              </DonateInput>
            </DonateValueContainer>
            <Text>Valor mínimo de R$5,00.</Text>
          </DonateContainer>*/}
          <ButtonOutline
            onClick={() =>
              addToCart(
                company.id,
                monthSelected,
                rangeValue,
                discountValue,
                donateValue
              )
            }
          >
            <FaShoppingCart /> Adicionar ao carrinho
          </ButtonOutline>
        </VoucherModal>
      </Modal>
    </>
  );
}
