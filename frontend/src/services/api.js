import axios from 'axios';

const api = axios.create({
  baseURL: 'http://142.93.120.172:3333',
});

export const picpay = axios.create({
  headers: {
    // can be common or any other method
    'x-picpay-token': '028065b6-3c3c-4171-9d22-5928d8adb950',
    // 'Accept-Encoding': '*',
  },
  baseURL: 'https://appws.picpay.com/ecommerce/public',
});

export default api;
