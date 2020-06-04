import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';

// import logo from '../../assets/images/logo.png';
import { SimpleButton } from '../../components/Button';
import { SimpleInput } from '../../components/Form';
import { signInRequest } from '../../store/modules/auth/actions';

// import { Container } from './styles';

export default function SingIn() {
  const dispatch = useDispatch();
  const [radio, setRadio] = useState('fisica');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      {/* <img src={logo} alt="Mercado Futuro" /> */}

      <Form
        onSubmit={handleSubmit}
        style={{
          width: 'fit-content',
          minWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <input
          type="radio"
          id="fisica"
          name="type"
          value="fisica"
          onClick={() => setRadio('fisica')}
          defaultChecked
        />
        <label for="fisica">Sou gente</label>
        <br />
        <input
          type="radio"
          id="juridica"
          name="type"
          value="juridica"
          onClick={() => setRadio('juridica')}
        />
        <label for="juridica">Sou empresa</label>
        <br />
        {radio === 'juridica' ? (
          <>
            <SimpleInput
              name="name"
              label="NOME DA SUA EMPRESA"
              type="text"
              placeholder="Robert Veloso"
            />
            <SimpleInput
              name="description"
              label="DESCRIÇÃO"
              type="text"
              placeholder="Robert Veloso"
            />
            <SimpleInput
              name="address"
              label="ENDEREÇO"
              type="text"
              placeholder="Av ..., 123 - Minha Cidade - UF"
            />
            <SimpleInput
              name="address-map"
              label="Google Maps"
              type="text"
              placeholder="endereço google maps"
            />
            <SimpleInput
              name="site"
              label="SITE"
              type="text"
              placeholder="https://meusite.com"
            />
            <SimpleInput
              name="phone"
              label="TELEFONE"
              type="text"
              placeholder="55XXXXXXXXXXX"
            />
          </>
        ) : (
          <>
            <SimpleInput
              name="first-name"
              label="SEU PRIMEIRO NOME"
              type="text"
              placeholder="Robert"
            />
            <SimpleInput
              name="last-name"
              label="SEU SOBRENOME"
              type="text"
              placeholder="Luiz Veloso"
            />
            <SimpleInput
              name="document"
              label="Documento"
              type="text"
              placeholder=" CPF, RG ou CNH"
            />
            <SimpleInput
              name="phone"
              label="TELEFONE"
              type="text"
              placeholder="55XXXXXXXXXXX"
            />
          </>
        )}
        <SimpleInput
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <SimpleInput
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="*************"
        />

        <SimpleButton type="submit">
          {loading ? 'Carregando...' : 'Cadastrar'}
        </SimpleButton>
        <br />
        <Link to="/login">já tenho uma conta.</Link>
      </Form>
    </>
  );
}
