'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import GHTK from '../src';
const token: string = 'token';
const ghtk: GHTK = new GHTK(token, { sandbox: true });

describe('ghtk', () => {
  it('get provinces', async () => {
    const pickUpAddresses = await ghtk.getPickUpAddresses();
    console.log('pickUpAddresses', pickUpAddresses);

    const level4AddressesQuery = { province: '', district: '', ward_street: '' };
    const level4Addresses = await ghtk.getLevel4Addresses(level4AddressesQuery);
    console.log('level4Addresses', level4Addresses);

    const term: string = 'laptop';
    const listOfProducts = await ghtk.getProducts(term);
    console.log('listOfProducts', listOfProducts);

    const xFastQuery = {
      pick_province: '',
      pick_district: '',
      customer_province: '',
      customer_district: '',
      customer_first_address: ''
    };
    const xFastServices = await ghtk.getXFastServices(xFastQuery);
    console.log('xFastServices', xFastServices);

    const estimateFeeQuery = {
      pick_address_id: '', // optional
      pick_address: '', // optional
      pick_province: '', // required
      pick_district: '', // required
      pick_ward: '', // optional
      pick_street: '', // optional
      address: '', // optional
      province: '', // required
      district: '', // required
      ward: '', // optional
      street: '', // optional
      weight: 0, // required (gram)
      value: 0, // optional
      transport: '', // optional
      deliver_option: '' // required
    };
    const estimatedFee = await ghtk.estimateFee(estimateFeeQuery);
    console.log('estimateFee', estimatedFee);

    const products = [
      {
        name: 'bút',
        weight: 0.1,
        quantity: 1,
        product_code: 1241
      },
      {
        name: 'tẩy',
        weight: 0.2,
        quantity: 1,
        product_code: 1254
      }
    ];
    const createOrderBody = {
      products,
      order: {
        id: 'a4',
        pick_name: 'HCM-nội thành',
        pick_address: '590 CMT8 P.11',
        pick_province: 'TP. Hồ Chí Minh',
        pick_district: 'Quận 3',
        pick_ward: 'Phường 1',
        pick_tel: '0911222333',
        tel: '0911222333',
        name: 'GHTK - HCM - Noi Thanh',
        address: '123 nguyễn chí thanh',
        province: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Phường Bến Nghé',
        hamlet: 'Khác',
        is_freeship: 1,
        pick_date: '2016-09-30',
        pick_money: 47000,
        note: 'Khối lượng tính cước tối đa: 1.00 kg',
        value: 3000000,
        transport: 'fly',
        street: '',
        email: '',
        return_name: '',
        return_address: '',
        return_province: '',
        return_district: '',
        return_tel: '',
        return_email: '',
        pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
        deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
        pick_session: 2 // Phiên lấy xfast
      }
    };
    const createdOrder = await ghtk.createOrder(createOrderBody);
    console.log('create order', createdOrder);

    const { label, partner_id } = createdOrder;
    const order = await ghtk.getOrder(label);
    console.log('order', order);

    const printedOrder = await ghtk.printOrder(label);
    console.log('print order', printedOrder);

    const cancelledOrder = await ghtk.cancelOrder(label);
    console.log('cancel order', cancelledOrder);

    assert.ok(typeof order === 'object');
  });
});
