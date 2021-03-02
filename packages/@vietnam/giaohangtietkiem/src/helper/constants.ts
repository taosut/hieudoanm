'use strict';

const production: string = 'https://services.giaohangtietkiem.vn';
const sandbox: string = 'https://services.ghtklab.com';

export const apis = {
  createOrder: {
    production: `${production}/services/shipment/order`,
    sandbox: `${sandbox}/services/shipment/order`,
    method: 'POST'
  },
  estimateFee: {
    production: `${production}/services/shipment/fee`,
    sandbox: `${sandbox}/services/shipment/fee`,
    method: 'GET'
  },
  getOrder: {
    production: `${production}/services/shipment/v2`,
    sandbox: `${sandbox}/services/shipment/v2`,
    method: 'GET'
  },
  cancelOrder: {
    production: `${production}/services/shipment/cancel`,
    sandbox: `${sandbox}/services/shipment/cancel`,
    method: 'POST'
  },
  printOrder: {
    production: `${production}/services/label`,
    sandbox: `${sandbox}/services/label`,
    method: 'POST'
  },
  getPickUpAddresses: {
    production: `${production}/services/shipment/list_pick_add`,
    sandbox: `${sandbox}/services/shipment/list_pick_add`,
    method: 'GET'
  },
  getLevel4Addresses: {
    production: `${production}/services/address/getAddressLevel4`,
    sandbox: `${sandbox}/services/address/getAddressLevel4`,
    method: 'GET'
  },
  getProducts: {
    production: `${production}/services/kho-hang/thong-tin-san-pham`,
    sandbox: `${sandbox}/services/kho-hang/thong-tin-san-pham`,
    method: 'GET'
  },
  getXFastServices: {
    production: `${production}/services/shipment/x-team`,
    sandbox: `${sandbox}/services/shipment/x-team`,
    method: 'GET'
  },
  addShop: {
    production: `${production}/services/shops/add`,
    sandbox: `${sandbox}/services/shops/add`,
    method: 'POST'
  },
  getShopToken: {
    production: `${production}/services/shops/token`,
    sandbox: `${sandbox}/services/shops/token`,
    method: 'POST'
  }
};

export interface IOptions {
  sandbox?: boolean;
}

export interface IEndpoint {
  production: string;
  sandbox: string;
  method: string | 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface IRequestOptions {
  query?: any;
  body?: any;
}

export interface IResponse {
  success?: boolean;
  message?: string;

  data?: any;
  order?: any;
}

export interface IOrderCreateRequest {
  products: Array<IOrderProduct>;
  order: IOrderCreate;
}

export interface IOrderCreateResponse {
  partner_id?: string;
  label?: string;
  area?: string;
  fee?: string;
  insurance_fee?: string;
  estimated_pick_time?: string;
  estimated_deliver_time?: string;
  products?: Array<IOrderProduct>;
  status_id?: number;
  // Error
  message?: string;
}

export interface IOrderProduct {
  name?: string;
  price?: number;
  weight?: number;
  quantity?: number;
  product_code?: number;
}

export interface IOrderCreate {
  id: string;
  // Pick Up Location
  pick_name: string;
  pick_money: number;
  pick_address_id?: string;
  pick_address: string;
  pick_province: string;
  pick_district: string;
  pick_ward?: string;
  pick_street?: string;
  pick_tel: string;
  pick_email?: string;
  // Deliver Location
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  hamlet: string;
  tel: string;
  note?: string;
  email: string;
  // Return Location
  use_return_address?: number;
  return_name: string;
  return_address: string;
  return_province: string;
  return_district: string;
  return_ward?: string;
  return_street?: string;
  return_tel: string;
  return_email: string;
  // Extra
  is_freeship?: number;
  weight_option?: string;
  total_weight?: number;
  pick_work_shift?: number;
  deliver_work_shift?: number;
  label_id?: string;
  pick_date?: string;
  deliver_date?: string;
  expired?: string;
  value?: number;
  opm?: number;
  pick_option?: string;
  actual_transfer_method?: string;
  transport?: string;
  deliver_option?: string;
  pick_session?: number;
}

export interface IToken {
  token?: string;
  code?: string;
  // Error
  message?: string;
}

export interface IShopAddRequest {
  name: string;
  first_address: string;
  province: string;
  district: string;
  tel: string;
  email: string;
}

export interface IXFastRequest {
  pick_province: string;
  pick_district: string;
  pick_ward?: string;
  pick_street?: string;

  customer_province: string;
  customer_district: string;
  customer_ward?: string;
  customer_street?: string;

  customer_first_address: string;
  customer_hamlet?: string;
}

export interface IProduct {
  full_name: string;
  product_code: string;
  weigh: number;
  cost: number;
}

export interface IAddressRequest {
  address?: string;
  province: string;
  district: string;
  ward_street: string;
}

export interface IAddressPick {
  pick_address_id: string;
  address: string;
  pick_tel: string;
  pick_name: string;
}

export interface IOrderCancelResponse {
  message: string;
}

export interface IOrderGetResponse {
  label_id?: string;
  partner_id?: string;
  status?: string;
  status_text?: string;
  created?: string;
  modified?: string;
  message?: string;
  pick_date?: string;
  deliver_date?: string;
  customer_fullname?: string;
  customer_tel?: string;
  address?: string;
  storage_day?: number;
  ship_money?: number;
  insurance?: number;
  value?: number;
  weight?: number;
  pick_money?: number;
  is_freeship?: number;
}

export interface IOrderEstimateFeeRequest {
  pick_address_id?: string;
  pick_address?: string;
  pick_province: string;
  pick_district: string;
  pick_ward?: string;
  pick_street?: string;
  address?: string;
  province: string;
  district: string;
  ward?: string;
  street?: string;
  weight: number;
  value?: number;
  transport?: string | 'road' | 'fly';
  deliver_option: string | 'none' | 'xteam';
}

export interface IOrderEstimateFeeResponse {
  name?: string;
  fee?: number;
  insurance_fee?: number;
  delivery_type?: string;
  delivery?: boolean;
  // Error
  message?: string;
}
