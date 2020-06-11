import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import noMedia from '../../assets/images/no_photography-black-48dp.svg';

import {
  SectionHeader,
  CompaniesContainer,
  CompaniesBanner,
  ProductList,
} from './styles';

import { Container, Section, Title } from '../../styles/dstyles';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce(
      (sumAmount, product) => ({ ...sumAmount, [product.id]: product.amount }),
      {}
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('companies');

      const data = response.data.map(product => ({
        ...product,
      }));

      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    history.push(`/empresas/${id}`);
  }

  /*function handleAddProduct(id) {
    dispatch(addToCartRequest(id));
  }*/
  if (loading) {
    return <strong>Carregando...</strong>;
  }

  return (
    <Container>
      <SectionHeader>Empresas cadastradas perto de você</SectionHeader>
      {products.length > 0 ? (
        <ProductList>
          {products.map(company => (
            <li key={company.id}>
              {company?.user?.avatar?.url ? (
                <img src={company?.user?.avatar?.url} alt={company.name} />
              ) : (
                <img src={noMedia} alt={'Sem foto'} width={150} />
              )}
              <span>{company.name}</span>
              <strong>{company.description}</strong>

              <button
                type="button"
                onClick={() => handleAddProduct(company?.user?.handle)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                  {amount[company.id] || 0}
                </div>

                <span>Vourchers no carrinho</span>
              </button>
            </li>
          ))}
        </ProductList>
      ) : (
        <CompaniesContainer>
          <Section>
            <div className="row">
              <div className="col-lg-6 col-12 text-lg-left text-center">
                <Title>
                  Estamos iniciando os cadastros a todo vapor!
                  <br />
                  <Link to="/cadastrar/empresa" style={{ color: '#75b4fb' }}>
                    <span>Cadastre sua empresa</span>
                  </Link>
                </Title>
              </div>
              <div className="col-lg-6 d-lg-flex d-none justify-content-center align-items-center">
                <CompaniesBanner />
              </div>
            </div>
          </Section>
        </CompaniesContainer>
      )}
    </Container>
  );
}
