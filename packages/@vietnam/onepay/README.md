# OnePay

A Node.js API Wrapper Library for [OnePay](https://www.onepay.vn/).

If you've found an bug/issue, please [send me an email](mailto:hieumdoan@gmail.com).

- [OnePay](#onepay)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

```sh
npm install onepay
# OR
yarn add onepay
```

## Usage

[Full Documentation](https://mtf.onepay.vn/developer/)

```ts
import OnePay from 'onepay';

const onePay = new OnePay({
  accessCode: '', // string
  merchant: '', // string
  returnUrl: '', // string
  secretKey: '', // string
});

// Create Payment URL
const order = {
  description: 'test',
  amount: 1000,
  ipAddr: '127.0.0.1',
  type: 'domestic' // options: 'domestic' OR 'international' - default "domestic"
};
const url: string = onePay.createPaymentUrl(order);

// Verify Return URL
const response = onePay.verifyReturnUrl(query);
const { message: '' } = response;
```
