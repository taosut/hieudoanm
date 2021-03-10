'use strict';

interface IOpenAPI {
  name: string;
  type: string;
  type_id: string;
  url: string;
  npm: string;
}

const openAPIs: Array<IOpenAPI> = [
  { name: 'fpt', type: 'A.I.', type_id: 'ai', url: 'https://docs.fpt.ai/en', npm: '' },
  { name: 'viettel', type: 'A.I.', type_id: 'ai', url: 'https://viettelgroup.ai/', npm: '' },
  {
    name: 'vietcetera',
    type: 'Blog',
    type_id: 'blog',
    url: 'https://vietcetera.com/',
    npm: 'vietcetera'
  },
  {
    name: 'giaohangnhanh',
    type: 'Delivery',
    type_id: 'delivery',
    url: 'https://api.ghn.vn/',
    npm: 'giaohangnhanh'
  },
  {
    name: 'giaohangtietkiem',
    type: 'Delivery',
    type_id: 'delivery',
    url: 'https://docs.giaohangtietkiem.vn/',
    npm: ''
  },
  { name: 'tiki', type: 'E-commerce', type_id: 'ecommerce', url: 'https://open.tiki.vn/', npm: '' },
  {
    name: 'zalo',
    type: 'Messaging',
    type_id: 'messaging',
    url: 'https://developers.zalo.me/',
    npm: ''
  },
  {
    name: 'momo',
    type: 'Payment',
    type_id: 'payment',
    url: 'https://developers.momo.vn/#/',
    npm: ''
  },
  {
    name: 'onepay',
    type: 'Payment',
    type_id: 'payment',
    url: 'https://mtf.onepay.vn/developer/',
    npm: 'onepay'
  },
  {
    name: 'vnpay',
    type: 'Payment',
    type_id: 'payment',
    url: 'https://sandbox.vnpayment.vn/apis/',
    npm: 'vnpay'
  },
  {
    name: 'vtcpay',
    type: 'Payment',
    type_id: 'payment',
    url: 'https://vtcpay.vn/tai-lieu-tich-hop-website?l=en',
    npm: 'vtcpay'
  },
  {
    name: 'zalopay',
    type: 'Payment',
    type_id: 'payment',
    url: 'https://docs.zalopay.vn/',
    npm: 'zalopay'
  }
];

export default openAPIs;
