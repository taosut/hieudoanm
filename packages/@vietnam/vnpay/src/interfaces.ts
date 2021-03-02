'use strict';

export interface Configs {
  payUrl?: string;
  tmnCode: string;
  secretKey: string;
  returnUrl: string;
}

export interface Order {
  description: string;
  type: string;
  amount: number;
  bankCode: string;
  ipAddr: string;
}
