'use strict';

export interface Configs {
  accessCode: string;
  merchant: string;
  returnUrl: string;
  secretKey: string;
}

export interface Order {
  type: string;
  description: string;
  amount: number;
  ipAddr: string;
}
