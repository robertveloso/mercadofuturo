import axios from 'axios';

const api = axios.create({
  headers: {
    // can be common or any other method
    Authorization:
      // COMPANY
      // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxMjA3NjAyLCJleHAiOjE1OTE4MTI0MDJ9.1KEofiU97pAP_LWFsHg4mII_QT2tYwHU5_REC4O7LCE',
      // CLIENT
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkxMjIxNDI2LCJleHAiOjE1OTE4MjYyMjZ9.HAkKTfdjJlXZ_p5OPi_OcNeAg8N8_aXmJg-ra3mbeZo',
    // 'Accept-Encoding': '*',
  },
  baseURL: 'http://localhost:3333',
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
