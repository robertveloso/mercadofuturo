import React, { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';

import { SimpleButton } from '../../components/Button';
import { MaskInput } from '../../components/Form';
import { SimpleInput } from '../../components/Form';
import { addClient } from '../../store/modules/auth/actions';

export default function CreateClient({ dispatch, loading }) {
  let match = useRouteMatch('/cadastrar/:id');
  const id = match?.params || null;
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const phoneRegExp = /^\+55\ \([1-9]{2}\) (?:[2-8]|9 [1-9])[0-9]{3}\-[0-9]{4}$/;

      const schema = Yup.object().shape({
        first_name: Yup.string().required('nome é obrigatório'),
        last_name: Yup.string().required('sobrenome é obrigatório'),
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
          addClient({
            first_name: data.first_name,
            last_name: data.last_name,
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
            name="first_name"
            label="SEU PRIMEIRO NOME"
            type="text"
            placeholder="Robert"
          />
          <SimpleInput
            name="last_name"
            label="SEU SOBRENOME"
            type="text"
            placeholder="Veloso"
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

CreateClient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};
