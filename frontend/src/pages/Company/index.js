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
  InputContainer,
  InputTitle,
  InputText,
  InputValueContainer,
  InputValueText,
  InputValue,
} from './styles';

import { colors } from '../../styles/colors';
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
      setCompany(data.find(item => item?.user?.handle === companySlug));
    }
    loadProducts();
  }, [companySlug]);

  const [show, setShow] = useState(false);
  const [monthSelected, setMonthSelected] = useState(1);
  const [dateSelected, setDateSelected] = useState('');
  const [rangeValue, setRangeValue] = useState(10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (type, value, date) => {
    if (type === 'month') {
      setMonthSelected(value);
      setDateSelected(date);
    } else {
      setRangeValue(value);
    }
  };

  const setValue = value => {
    if (formatPrice(value) >= 10 && formatPrice(value) <= 1000) {
      setRangeValue(formatPrice(value));
    } else if (formatPrice(value) < 10) {
      toast.info('valor reajustado para o mínimo de R$ 10,00');
      setRangeValue(10);
    } else if (formatPrice(value) > 1000) {
      toast.info('valor reajustado para o máximo de R$ 1000,00');
      setRangeValue(1000);
    }
  };

  const options = [10, 1000];
  // 8 months from now.
  const months = [
    { reference: '6/2020', label: 'Junho 2020' },
    { reference: '7/2020', label: 'Julho 2020' },
    { reference: '8/2020', label: 'Agosto 2020' },
    { reference: '9/2020', label: 'Setembro 2020' },
    { reference: '10/2020', label: 'Outubro 2020' },
    { reference: '11/2020', label: 'Novembro 2020' },
    { reference: '12/2020', label: 'Dezembro 2020' },
    { reference: '1/2021', label: 'Janeiro 2021' },
  ];

  const formatPriceEN = price => {
    return parseFloat(String(price).replace('R$', ''));
  };

  const formatPrice = price => {
    return parseFloat(
      String(price)
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')
    );
  };

  const addToCart = (id, date, bonus, price) => {
    if (formatPriceEN(price) < 10 || formatPriceEN(price) > 1000) {
      toast.error('Valor mínimo de R$10,00.');
      return;
    }
    dispatch(addToCartRequest(id, date, bonus, price));
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
                        <FaFacebook color={colors.primary} />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a
                        href="https://www.instagram.com"
                        title="Acessar Instagram"
                      >
                        <FaInstagram color={colors.primary} />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a href="https://www.twitter.com" title="Acessar Twitter">
                        <FaTwitterSquare color={colors.primary} />
                      </a>
                    </CompanyDetailsSocialNetworksItem>
                    <CompanyDetailsSocialNetworksItem>
                      <a
                        href="https://api.whatsapp.com"
                        title="Acessar WhatsApp"
                      >
                        <FaWhatsapp color={colors.primary} />
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
                    <a href={`tel:${company.phone.replace(/([() -])/g, '')}`}>
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
                    onClick={() =>
                      handleChange('month', index + 1, month.reference)
                    }
                    key={index}
                  >
                    {month.label}
                  </MonthItem>
                );
              })}
            </MonthList>
            <Bonus>
              <FaGem />
              <Text>Bônus</Text>
              <Text id="bonusPercentage">{`${parseInt(monthSelected)}%`}</Text>
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
                maxLength={6}
                precision={0}
                decimalSeparator=","
                thousandSeparator="."
                value={rangeValue}
                onChangeEvent={ev => setValue(ev.target.value)}
                onBlur={ev => setValue(ev.target.value)}
              />
            </InputValue>
          </InputContainer>
          <ButtonOutline
            onClick={() =>
              addToCart(company.id, dateSelected, monthSelected, rangeValue)
            }
          >
            <FaShoppingCart /> Adicionar ao carrinho
          </ButtonOutline>
        </VoucherModal>
      </Modal>
    </>
  );
}
