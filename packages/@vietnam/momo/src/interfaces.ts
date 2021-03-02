'use strict';

export interface Configs {
  partnerCode: string;
  accessKey: string;
  secretKey: string;
  publicKey: string;
  notifyUrl: string;
  returnUrl: string;
  test?: boolean;
}

export interface Order {
  orderId: string;
  amount: number;
  requestId: string;
  orderInfo: string;
  extraData?: any;
}
