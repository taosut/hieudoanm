'use strict';

export interface ConfigsV1 {
  appid: string;
  key1: string;
  key2: string;
  test?: boolean;
}

export interface ConfigsV2 {
  app_id: string;
  key1: string;
  key2: string;
  test?: boolean;
}

export interface TransactionV1 {
  appuser: string;
  amount: number;
  embeddata: any;
  items: Array<Item>;
  bankcode: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface TransactionV2 {
  app_user: string;
  amount: number;
  items: Array<Item>;
  bank_code: string;
  description: string;

  redirecturl?: string;
  columninfo?: any;
  campaigncode?: string;
  zlppaymentid?: string;

  product_code?: string;
  device_info?: any;
  callback_url?: string;
  title?: string;
  order_type?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface Item {
  itemid: string;
  itemname: string;
  itemprice: number;
  itemquantity: number;
}

export interface RequestBody {
  data: string;
  mac: string;
}
