# Momo

- [Momo](https://momo.vn/)
- [Momo Documents](https://developers.momo.vn/)

```ts
import { Momo } from 'vnapis';

const momo = new Momo({
  partnerCode: '', // string
  accessKey: '', // string
  secretKey: '', // string
  publicKey: '', // string
  notifyUrl: '', // string
  returnUrl: '' // string
});

// Transaction Processor
const order = {
  orderId: orderId,
  amount: 1000,
  orderInfo: 'Test',
  requestId: 'MM1540456472575'
};
const res: any = await momo.transactionProcessor(order);
// {
//   "requestId": "",
//   "errorCode": 0,
//   "orderId": "",
//   "message": 0,
//   "localMessage": "",
//   "requestType": 0,
//   "payUrl": "",
//   "signature": 0,
//   "qrCodeUrl": 0,
//   "deeplink": "",
//   "deeplinkWebInApp": 0,
// }
```
