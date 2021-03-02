'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import Momo from '../src/';

describe('Momo', () => {
  const configs = {
    partnerCode: 'MOMO',
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    publicKey:
      'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAohdHc1KjKfu+T6ABqGAhieGO9omjvspfz4FWY0dd55plrBdFQYuYubc43hOkNtRXFUsrxYKB3FiBot0T12bde8XMveQe/HzUkdc46d7SR7CQyANEQvKt2SRDTyeyQAW9XVnWw5CsK1zFCRCBNH3RsEcMfzWPneK1tKaA+4ilL7br/0Xr0ajtpdS9ySWJyVLZh3sj3hHpz9NE9SrtRA74N2UcHEaVKg6e34G/hZKaQW87yto6H/0jXx0oKZQ7/qQyKqxiNpdlWKHQgRTFr3R8L1S52ipJvjJ9oenVwxafRmQ4fp4UcOuleXblcSmK/d3Bj+2cBx4O9Z6B4Ic4dY2TSYgof/g0HvSIBTqOGug84cGxTsnoxVKv0RdLAp9lE29ZF+kRGDaoexLeJog/SLWOpgQWs2ZL/StCfdiLDaP52fMui8ePp92LeZlW0oAQtMeOu6YR5Yz0zsHP96eFHTABooXs3sbf0+5ADQwTAjtC5x9B+CuzFYF0Kg5BSWGQPEpV9Ta83eZ5cTXE4KuYRVupCi4UhFaq74u36wQucLMJhrg0GagFrfVwBYmDhMA2BNmp4+ORiSYdklSNFH2cXMJOSJhUL5KT8DmpzpZp5kmvPaXI5q0hHY2+lP5VtMWlp7vOOC4onbg1RuPv2YeBSXjcbp7ZEbbchv+8rKjRnTNtFncCAwEAAQ==',
    notifyUrl: 'https://momo.vn',
    returnUrl: 'https://momo.vn',
    test: true
  };

  it('create payment url', async () => {
    const momo: Momo = new Momo(configs);
    const d = new Date();
    const orderId = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;

    const order = {
      orderId: orderId,
      amount: 1000,
      orderInfo: 'Test',
      requestId: 'MM1540456472575'
    };
    const res: any = await momo.transactionProcessor(order);
    console.log(res);
    assert.ok(typeof res === 'object');
  });
});
