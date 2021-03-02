# Giao Hang Nhanh

A Node.js API Wrapper Library for [Giao Hang Nhanh](https://ghn.vn/)

If you've found an bug/issue, please [send me an email](mailto:hieumdoan@gmail.com).

- [Giao Hang Nhanh](#giao-hang-nhanh)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Order](#order)
      - [Create Order](#create-order)
      - [Get Order Info](#get-order-info)
      - [Get Order Info (by client_order_code)](#get-order-info-by-client_order_code)
      - [Get Fee of Order Info](#get-fee-of-order-info)
      - [Update Order](#update-order)
      - [Update COD of Order](#update-cod-of-order)
      - [Print Order](#print-order)
      - [Return Order](#return-order)
      - [Cancel Order](#cancel-order)
    - [Service - Calculate Fee](#service---calculate-fee)
      - [Get Services](#get-services)
      - [Calculate Fee](#calculate-fee)
      - [Calculate the Expected Delivery Time](#calculate-the-expected-delivery-time)
    - [Address](#address)
      - [Get Provinces](#get-provinces)
      - [Get Districts](#get-districts)
      - [Get Wards](#get-wards)
      - [Get Stations](#get-stations)
    - [Store](#store)
      - [Get Stores](#get-stores)
      - [Create Store](#create-store)
      - [Add Staff to the Store](#add-staff-to-the-store)
      - [Delivery Again](#delivery-again)
    - [Ticket](#ticket)
      - [Get Ticket](#get-ticket)
      - [Create Ticket](#create-ticket)
      - [Create Feedback of Ticket](#create-feedback-of-ticket)

## Installation

```sh
npm install giaohangnhanh
# OR
yarn add giaohangnhanh
```

## Usage

How to get API token [instruction](https://api.ghn.vn/home/docs/detail?id=116).

```ts
import GHN from 'giaohangnhanh';
const token: string = 'apikey';
const ghn: GHN = new GHN(token);
// OR
const ghn: GHN = new GHN(token, { test: true }); // enable test flag for testing API token
```

[Full Documentation](https://api.ghn.vn/)

### Order

#### Create Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=63)

```ts
const shop_id: number = 0;
const info = {
  to_name: '',
  to_phone: '',
  to_address: '',
  to_ward_code: '',
  to_district_id: 0,
  service_id: 0,
  service_type_id: 0,
  content: '',
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  payment_type_id: 1, // CHOTHUHANG - CHOXEMHANGKHONGTHU - KHONGCHOXEMHANG
  required_note: ''
};
const order = await ghn.order.createOrder(shop_id, info);
```

#### Get Order Info

[Documentation](https://api.ghn.vn/home/docs/detail?id=66)

```ts
const order_code: string = '';
const order = await ghn.order.getOrder(order_code);
```

#### Get Order Info (by client_order_code)

[Documentation](https://api.ghn.vn/home/docs/detail?id=118)

```ts
const client_order_code: string = '';
const orderByClientCode = await ghn.order.getOrderByClientCode(client_order_code);
```

#### Get Fee of Order Info

[Documentation](https://api.ghn.vn/home/docs/detail?id=71)

```ts
const order_code: string = '';
const orderFee = await ghn.order.getOrderFee(order_code);
```

#### Update Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=75)

```ts
const updatedOrder: any = {
  content: 'Updated Test Content'
}
const { message } = await ghn.order.updateOrder(shop_id, order_code, updatedOrder);
```

#### Update COD of Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=64)

```ts
const cod_amount: number = 0;
const { message } = await ghn.order.updateOrderCOD(order_code, amount);
```

#### Print Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=64)

```ts
const order_codes: Array<string> = [order_code];
const printOrder = await ghn.order.printOrder([order_code]);
```

#### Return Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=72)

```ts
const order_codes: Array<string> = [order_code];
const returnOrder = await ghn.order.returnOrder(order_codes);
```

#### Cancel Order

[Documentation](https://api.ghn.vn/home/docs/detail?id=73)

```ts
const order_codes: Array<string> = [order_code];
const cancelOrder = await ghn.order.cancelOrder(order_codes);
```

### Service - Calculate Fee

#### Get Services

[Documentation](https://api.ghn.vn/home/docs/detail?id=77)

```ts
const shop_id: number = 0;
const from_district: number = 0;
const to_district: number = 0;
const services = await ghn.service.getServices(shop_id, from_district, to_district);
```

#### Calculate Fee

[Documentation](https://api.ghn.vn/home/docs/detail?id=76)

```ts
const shop_id: number = 0;
const service_id: number = 0;
const to_ward_code: string = '';
const to_district_id: number = 0;
const weight: number = 0; // gram
const length: number = 0; // cm
const width: number = 0; // cm
const height: number = 0; // cm
const options = {
  service_id,
  to_ward_code,
  to_district_id,
  weight,
  length,
  width,
  height
};
const feeData = await ghn.service.calculateFee(shop_id, options);
```

#### Calculate the Expected Delivery Time

[Documentation](https://api.ghn.vn/home/docs/detail?id=114)

```ts
const shop_id: number = 0;
const from_district_id: number = 0;
const from_ward_code: string = '';
const to_district_id: number = 0;
const to_ward_code: string = '';
const service_id: number = 0;
const timeData = await ghn.service.calculateExpectedDeliveryTime(shop_id, {
  from_district_id,
  from_ward_code,
  to_district_id,
  to_ward_code,
  service_id
});
```

### Address

#### Get Provinces

[Documentation](https://api.ghn.vn/home/docs/detail?id=60)

```ts
const provinces = await ghn.address.getProvinces();
```

#### Get Districts

[Documentation](https://api.ghn.vn/home/docs/detail?id=78)

```ts
const province_id: number = 0;
const districts = await ghn.address.getDistricts(province_id);
```

#### Get Wards

[Documentation](https://api.ghn.vn/home/docs/detail?id=61)

```ts
const district_id: number = 0;
const wards = await ghn.address.getWards(district_id);
```

#### Get Stations

[Documentation](https://api.ghn.vn/home/docs/detail?id=62)

```ts
const district_id: number = 0; // optional
const ward_code: string = ''; // optional
const options = { district_id, ward_code, offset: 0, limit: 1000 };
const stations = await ghn.address.getStations(options);
```

### Store

#### Get Stores

[Documentation](https://api.ghn.vn/home/docs/detail?id=79)

```ts
const client_phone: string = '';
const pagination = { offset: 0, limit: 10000 };
const stores = await ghn.store.getStores(client_phone, pagination);
```

#### Create Store

[Documentation](https://api.ghn.vn/home/docs/detail?id=58)

```ts
const district_id: number = 0; // required
const ward_code: string = ''; // required
const name: string = ''; // required
const phone: string = ''; // required
const address: string = ''; // required
const info = { name, phone, address };
const { shop_id } = await ghn.store.createStore(district_id, ward_code, info);
```

#### Add Staff to the Store

[Documentation](https://api.ghn.vn/home/docs/detail?id=59)

```ts
const shop_id: number = 0;
const phone_number: string = '';
const { client_shop_id } = await ghn.store.addStaff(shop_id, phone_number);
```

#### Delivery Again

[Documentation](https://api.ghn.vn/home/docs/detail?id=65)

```ts
const shop_id: number = 0;
const order_codes: Array<string> = [];
const orders = await ghn.store.deliverAgain(shop_id, order_codes);
```

### Ticket

#### Get Ticket

[Documentation](https://api.ghn.vn/home/docs/detail?id=68)

```ts
const ticket_id: number = 0;
const ticket = await ghn.ticket.getTicket(ticket_id);
```

#### Create Ticket

[Documentation](https://api.ghn.vn/home/docs/detail?id=70)

```ts
const c_email: string = '';
const category: string = ''; // optional: Tư vấn - Hối Giao/Lấy/Trả hàng - Thay đổi thông tin - Khiếu nại
const description: string = '';
const order_code: string = '';
const ticket_info: any = { c_email, category, description, order_code };
const ticket = await ghn.ticket.createTicket(ticket_info);
```

#### Create Feedback of Ticket

[Documentation](https://api.ghn.vn/home/docs/detail?id=69)

```ts
const ticket_id: number = 0;
const feedback_info = { description: '' };
const ticket = await ghn.ticket.addFeedbackToTicket(ticket_id, feedback_info);
```
