'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import GHN from '../src';
const token: string = 'token';
const ghn: GHN = new GHN(token, { test: true });

describe('address', () => {
  it('get provinces', async () => {
    const provinces = await ghn.address.getProvinces();
    console.log('provinces', provinces);
    assert.ok(typeof provinces === 'object');
  });

  it('get districts', async () => {
    const province_id: number = 201; // Hà Nội
    const districts = await ghn.address.getDistricts(province_id);

    console.log('districts', districts);
    assert.ok(typeof districts === 'object');
  });

  it('get districts', async () => {
    const district_id1: number = 1489; // Quận Hoàn Kiếm
    const wards1 = await ghn.address.getWards(district_id1);

    const district_id2: number = 1485; // Quận Cầu Giấy
    const wards2 = await ghn.address.getWards(district_id2);

    console.log('wards1', wards1);
    console.log('wards2', wards2);

    assert.ok(typeof wards1 === 'object');
  });

  it('get stations', async () => {
    const options = { offset: 0, limit: 1000 };
    const stations = await ghn.address.getStations(options);
    console.log('stations', stations);
    assert.ok(typeof stations === 'object');
  });
});

describe('order && ticket', () => {
  it('all order && ticket apis', async () => {
    const shop_id: number = 0;
    const info = {
      to_name: 'Test Order',
      to_phone: '0904050607',
      to_address: '123 ABC',
      to_ward_code: '1A0212',
      to_district_id: 1489,
      service_id: 53320,
      service_type_id: 2,
      content: 'Test Content',
      weight: 10, // gram
      length: 10, // cm
      width: 10, //cm
      height: 10, //cm
      payment_type_id: 1,
      required_note: 'CHOTHUHANG',
      client_order_code: 'TEST_CLIENT_ORDER_CODE'
    };
    const createdOrder = await ghn.order.createOrder(shop_id, info);
    console.log('create order', createdOrder);

    const { order_code = '' } = createdOrder;

    if (order_code) {
      const order = await ghn.order.getOrder(order_code);
      console.log('order', order_code, order);

      const { client_order_code = '' } = order;
      const orderByClientCode = await ghn.order.getOrderByClientCode(client_order_code);
      console.log(`orderByClientCode client_order_code ${client_order_code}`, orderByClientCode);

      const orderFee = await ghn.order.getOrderFee(order_code);
      console.log('orderFee', orderFee);

      const c_email: string = 'test@example.com';
      const category: string = 'Tư vấn';
      const description: string = 'Test Description';
      const ticket_info: any = { c_email, category, description, order_code };
      const createdTicket = await ghn.ticket.createTicket(ticket_info);
      console.log('create ticket', createdTicket);

      const { id: ticket_id } = createdTicket;
      if (ticket_id) {
        const ticket = await ghn.ticket.getTicket(ticket_id);
        console.log('ticket', ticket);

        const feedback_info = { description: 'Test Feedback' };
        const feedback = await ghn.ticket.addFeedbackToTicket(ticket_id, feedback_info);
        console.log('feedback', feedback);
      }

      const { message } = await ghn.order.updateOrder(shop_id, order_code, {
        content: 'Updated Test Content'
      });
      console.log(`updatedOrder message ${message}`);

      const cod_amount: number = 10000;
      const { message: codMessage } = await ghn.order.updateOrderCOD(order_code, cod_amount);
      console.log(`updatedCOD message ${codMessage}`);

      const order_codes: Array<string> = [order_code];

      const printOrder = await ghn.order.printOrder(order_codes);
      console.log('printOrder', printOrder);

      const deliverAgainOrder = await ghn.store.deliverAgain(shop_id, order_codes);
      console.log('deliverAgainOrder', deliverAgainOrder);

      const returnOrder = await ghn.order.returnOrder(order_codes);
      console.log('returnOrder', returnOrder);

      const cancelOrder = await ghn.order.cancelOrder(order_codes);
      console.log('cancelOrder', cancelOrder);

      assert.ok(typeof order === 'object');
    }
  });
});

describe('service', () => {
  it('get services', async () => {
    const shop_id: number = 76817;
    const from_district: number = 1489;
    const to_district: number = 1485;
    const services = await ghn.service.getServices(shop_id, from_district, to_district);
    console.log('services', services);
    assert.ok(typeof services === 'object');
  });

  it('calculate fee', async () => {
    const shop_id: number = 76817;
    const service_id: number = 53320;
    const to_ward_code: string = '1A0217';
    const to_district_id: number = 1489;
    const weight: number = 10; // gram
    const length: number = 10; // cm
    const width: number = 10; // cm
    const height: number = 10; // cm
    const feeData = await ghn.service.calculateFee(shop_id, {
      service_id,
      to_ward_code,
      to_district_id,
      weight,
      length,
      width,
      height
    });
    console.log('feeData', feeData);
    assert.ok(typeof feeData === 'object');
  });

  it('calculate expected delivery time', async () => {
    const shop_id: number = 76817;
    const from_district_id: number = 1485;
    const from_ward_code: string = '1A0605';
    const to_district_id: number = 1489;
    const to_ward_code: string = '1A0217';
    const service_id: number = 53320;
    const timeData = await ghn.service.calculateExpectedDeliveryTime(shop_id, {
      from_district_id,
      from_ward_code,
      to_district_id,
      to_ward_code,
      service_id
    });
    console.log('timeData', timeData);
    assert.ok(typeof timeData === 'object');
  });
});

describe('store', () => {
  it('get stores', async () => {
    const client_phone = '0904050607';
    const pagination = { offset: 0, limit: 1000 };
    const stores = await ghn.store.getStores(client_phone, pagination);
    console.log('stores', stores);
    assert.ok(typeof stores === 'object');
  });

  it('create store && add staff', async () => {
    const district_id: number = 1489;
    const ward_code: string = '1A0217';
    const name: string = 'Test';
    const phone: string = '0904050607';
    const address: string = 'Test Store';
    const info = { name, phone, address };
    const { shop_id } = await ghn.store.createStore(district_id, ward_code, info);
    console.log('create store', 'shop_id', shop_id);

    if (shop_id) {
      const phone_number = '0904050607';
      const { client_shop_id, message } = await ghn.store.addStaff(shop_id, phone_number);
      console.log(`staff client_shop_id ${client_shop_id} message ${message}`);
    }

    assert.ok(typeof shop_id === 'object');
  });
});
