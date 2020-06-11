import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import { SimpleButton } from '../../components/Button';
import { MaskInput } from '../../components/Form';
import { SimpleInput } from '../../components/Form';
import { signUpRequest } from '../../store/modules/auth/actions';

import cpf from '../../util/cpf';
import cnpj from '../../util/cnpj';

import { ButtonMF } from './styles';

export default function SignUp(props) {
  //const { dispatch, loading, handleNext, provider, setProvider } = props;
  const { handleNext, handleBack, activeStep, provider, setProvider } = props;
  let match = useRouteMatch('/cadastrar/:id');
  console.log('match', match);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const id = match?.params || null;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(userId) {
      // if (id) {
      //   const response = await api.get(`/users/${userId}`);
      //   formRef.current.setData(response.data);
      //   // formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
      // }
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        document: Yup.string()
          .required('documento é obrigatório')
          .test(
            'document test',
            'documento é inválido',
            value => cpf.isValid(value) || cnpj.isValid(value)
          ),
        handle: Yup.string()
          .required('usuário é obrigatório')
          .matches(/^[a-z]+$/, {
            message: 'usuário deve conter apenas letras minúscula',
            excludeEmptyString: true,
          }),
        email: Yup.string()
          .required('email é obrigatório')
          .email('e-mail deve ser válido'),
        password: Yup.string()
          .required('senha é obrigatória')
          .min(6, 'senha deve ter ao menos 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const striped = data.document.replace(/[^0-9]+/g, '');

      // const dataFile = new FormData();

      // dataFile.append('file', data.avatar);

      // const responseFile = data.avatar
      //   ? await api.post('files', dataFile)
      //   : null;

      if (id) {
        // await api.put(`/users/${id}`, {
        //   handle: data.handle,
        //   email: data.email,
        //   document: doc,
        //   password,
        //   // avatar_id: responseFile?.data?.id,
        // });
        toast.success('Usuário editado com sucesso!');
      } else {
        toast.success('');
        return dispatch(
          signUpRequest({
            handle: data.handle,
            email: data.email,
            document: striped,
            password: data.password,
            handleNext,
          })
        );
        /*if (response.data.status === 200) {
          handleNext();
        }*/
      }
      // reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <ButtonMF
        onClick={() => {
          setProvider(!provider);
          formRef.current.reset();
        }}
      >
        É PESSOA {provider ? 'FÍSICA' : 'JURÍDICA'}?
      </ButtonMF>
      <div className="row">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            width: 'fit-content',
            minWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {provider ? (
            <MaskInput
              name="document"
              label="SEU CNPJ"
              type="text"
              mask="99.999.999/9999-99"
              alwaysShowMask
              placeholder="CNPJ"
            />
          ) : (
            <MaskInput
              name="document"
              label="SEU CPF"
              type="text"
              mask="999.999.999-99"
              alwaysShowMask
              placeholder="CPF"
            />
          )}
          <SimpleInput
            name="handle"
            label="@USUÁRIO"
            type="text"
            placeholder="robertveloso"
          />
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
          <SimpleButton
            onClick={ev => {
              ev.preventDefault();
              handleBack();
            }}
            disabled={activeStep === 0}
          >
            Voltar
          </SimpleButton>
          <SimpleButton type="submit">
            {loading ? 'Carregando...' : 'Salvar'}
          </SimpleButton>
          <br />
          <br />
          <Link to="/login">Já tenho uma conta</Link>
        </Form>
      </div>
    </>
  );
}

SignUp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};
