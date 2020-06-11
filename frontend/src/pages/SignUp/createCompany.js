import React, { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import { SimpleButton } from '../../components/Button';
import { MaskInput } from '../../components/Form';
import { SimpleInput } from '../../components/Form';
import { addCompany } from '../../store/modules/auth/actions';

export default function CreateCompany({ dispatch, loading }) {
  let match = useRouteMatch('/cadastrar/:id');
  const id = match?.params || null;
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const phoneRegExp = /^\+55\ \([1-9]{2}\) (?:[2-8]|9 [1-9])[0-9]{3}\-[0-9]{4}$/;

      const schema = Yup.object().shape({
        company_name: Yup.string().required('nome é obrigatório'),
        description: Yup.string().required('descrição é obrigatória'),
        address: Yup.string().required('endereço é obrigatório'),
        site: Yup.string().required('site é obrigatório'),
        phone: Yup.string()
          .required('celular é obrigatório')
          .matches(phoneRegExp, {
            message: 'número inválido',
            excludeEmptyString: true,
          }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const striped = data.phone.replace(/[^0-9]+/g, '');

      if (id) {
        // await api.put(`/users/${id}`, {
        //   handle: data.handle,
        //   email: data.email,
        //   document: doc,
        //   password,
        //   // avatar_id: responseFile?.data?.id,
        // });
      } else {
        toast.success('');
        return await dispatch(
          addCompany({
            company_name: data.company_name,
            description: data.description,
            address: data.address,
            site: data.site,
            phone: striped,
          })
        );
      }
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
      <div className="row" style={{ margin: '20px' }}>
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
          <SimpleInput
            name="company_name"
            label="NOME FANTASIA"
            type="text"
            placeholder="Mercado Futuro"
          />
          <SimpleInput
            name="description"
            label="DESCRIÇÃO"
            type="text"
            placeholder="Descrição resumida da minha super empresa"
          />
          <SimpleInput
            name="address"
            label="ENDEREÇO"
            type="text"
            placeholder="Av Brasil, 123 - Minha Cidade - UF"
          />
          <SimpleInput
            name="site"
            label="SITE"
            type="text"
            placeholder="https://meusite.com"
          />
          <MaskInput
            name="phone"
            label="SEU TELEFONE"
            type="text"
            mask="+55 (99) 9 9999-9999"
            placeholder="+55 (99) 9 9999-9999"
            alwaysShowMask
          />
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

CreateCompany.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};
