import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { store } from '../../index';

import {
  signInSuccess,
  signFailure,
  signUpSuccess,
  signUpFailure,
  addClientFinished,
  addCompanyFinished,
} from './actions';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/vouchers');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* singUp({ payload }) {
  try {
    console.log('john69', payload);
    const { handle, email, document, password, handleNext } = payload;

    const userResponse = yield call(api.post, 'users', {
      handle,
      email,
      document,
      password,
    });

    console.log('robert', userResponse);

    // const { id } = userResponse.data;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signUpSuccess(token, user));
    toast.success('Usuário criado com sucesso!');
    handleNext();
  } catch (err) {
    switch (err.response.data.error) {
      case 'user/email-already-exists': {
        toast.error('E-mail já cadastrado');
        break;
      }
      case 'user/handle-already-exists': {
        toast.error('Usuário já cadastrado');
        break;
      }
      case 'user/document-already-exists': {
        toast.error('Documento já cadastrado');
        break;
      }
      default: {
        toast.error('Falha na autenticação, verifique seus dados');
        break;
      }
    }
    yield put(signUpFailure());
  }
}

export function* addClient({ payload }) {
  try {
    const { first_name, last_name, phone } = payload;
    const user_id = store.getState().auth.user_id;

    yield call(api.post, 'clients', {
      user_id,
      first_name,
      last_name,
      phone,
    });

    yield put(addClientFinished());

    history.push('/vouchers');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signUpFailure());
  }
}

export function* addCompany({ payload }) {
  try {
    const { company_name, description, address, site, phone } = payload;

    const user_id = store.getState().auth.user_id;

    yield call(api.post, 'companies', {
      user_id,
      name: company_name,
      description,
      address,
      site,
      phone,
    });

    yield put(addCompanyFinished());

    history.push('/vouchers');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signUpFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
  takeLatest('@auth/ADD_CLIENT_REQUEST', addClient),
  takeLatest('@auth/ADD_COMPANY_REQUEST', addCompany),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
