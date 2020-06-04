import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import { addToCartSuccess, clearCart } from './actions';

import { store } from '../../index';

function* addToCart({ id, month, price, discount, donate }) {
  const { signed } = store.getState().auth;
  if (!signed) {
    yield put(clearCart());
    history.push('/login');
    return;
  }
  const response = yield call(api.get, `companies/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    month,
    price,
    discount,
    donate,
    priceFormatted: formatPrice(price),
  };

  yield put(addToCartSuccess(data));

  history.push('/carrinho');
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
