import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';

// import logo from '../../assets/images/logo.png';
import { SimpleButton } from '../../components/Button';
import { SimpleInput } from '../../components/Form';
import { signInRequest } from '../../store/modules/auth/actions';

import { Container, Section } from '../../styles/dstyles';

import { SignInContainer } from './styles';

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <SignInContainer>
        <Section>
          <div className="row">
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
                {loading ? 'Carregando...' : 'Acessar'}
              </SimpleButton>
              <br />
              <Link to="/cadastrar">Não tenho uma conta ainda...</Link>
            </Form>
          </div>
        </Section>
      </SignInContainer>
    </Container>
  );
}
