import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import { addToCartSuccess, clearCart } from './actions';

import { store } from '../../index';

function* addToCart({ id, date, bonus, price }) {
  const { signed } = store.getState().auth;
  if (!signed) {
    yield put(clearCart());
    history.push('/login');
    return;
  }
  const response = yield call(api.get, `companies/${id}`);
  console.log('robert rocks', id, date, bonus, price);
  const data = {
    ...response.data,
    company_id: id,
    amount: 1,
    date,
    bonus,
    price,
    priceFormatted: formatPrice(price),
  };

  yield put(addToCartSuccess(data));

  history.push('/carrinho');
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
