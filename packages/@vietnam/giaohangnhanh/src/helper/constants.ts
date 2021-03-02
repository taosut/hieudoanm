'use strict';

export const shippingStatuses = [
  { status: 'ready_to_pick', description: 'Shipping order has just been created' },
  { status: 'picking', description: 'Shipper is coming to pick up the goods' },
  { status: 'cancel', description: 'Shipping order has been cancelled' },
  { status: 'money_collect_picking', description: 'Shipper are interacting with the seller' },
  { status: 'picked', description: 'Shipper is picked the goods' },
  { status: 'storing', description: 'The goods has been shipped to GHN sorting hub' },
  { status: 'transporting', description: 'The goods are being rotated' },
  {
    status: 'sorting',
    description: 'The goods are being classified (at the warehouse classification)'
  },
  { status: 'delivering', description: 'Shipper is delivering the goods to customer' },
  { status: 'money_collect_delivering', description: 'Shipper is interacting with the buyer' },
  { status: 'delivered', description: 'The goods has been delivered to customer' },
  { status: 'delivery_fail', description: "The goods hasn't been delivered to customer" },
  {
    status: 'waiting_to_return',
    description: 'The goods are pending delivery (can be delivered within 24/48h)'
  },
  {
    status: 'return',
    description: 'The goods are waiting to return to seller/merchant after 3 times delivery failed'
  },
  { status: 'return_transporting', description: 'The goods are being rotated' },
  {
    status: 'return_sorting',
    description: 'The goods are being classified (at the warehouse classification)'
  },
  { status: 'returning', description: 'The shipper is returning for seller' },
  { status: 'return_fail', description: 'The returning is failed' },
  { status: 'returned', description: 'The goods has been returned to seller/merchant' },
  {
    status: 'exception',
    description:
      'The goods exception handling (cases that go against the process).\nFor example:\n- The order has been taken but the reseller has requested it\n- The order has been delivered but the buyer wants to return it'
  },
  { status: 'damage', description: 'Damaged goods' },
  { status: 'lost', description: 'The goods are lost' }
];

const production: string = `https://online-gateway.ghn.vn`;
const test: string = `https://dev-online-gateway.ghn.vn`;

export const apis = {
  order: {
    createOrder: {
      production: `${production}/shiip/public-api/v2/shipping-order/create`,
      test: `${test}/shiip/public-api/v2/shipping-order/create`,
      method: 'POST'
    },
    getOrder: {
      production: `${production}/shiip/public-api/v2/shipping-order/detail`,
      test: `${test}/shiip/public-api/v2/shipping-order/detail`,
      method: 'GET'
    },
    getOrderByClientCode: {
      production: `${production}/shiip/public-api/v2/shipping-order/detail-by-client-code`,
      test: `${test}/shiip/public-api/v2/shipping-order/detail-by-client-code`,
      method: 'GET'
    },
    getOrderFee: {
      production: `${production}/shiip/public-api/v2/shipping-order/soc`,
      test: `${test}/shiip/public-api/v2/shipping-order/soc`,
      method: 'POST'
    },
    updateOrder: {
      production: `${production}/shiip/public-api/v2/shipping-order/update`,
      test: `${test}/shiip/public-api/v2/shipping-order/update`,
      method: 'POST'
    },
    updateOrderCOD: {
      production: `${production}/shiip/public-api/v2/shipping-order/updateCOD`,
      test: `${test}/shiip/public-api/v2/shipping-order/updateCOD`,
      method: 'POST'
    },
    printOrder: {
      production: `${production}/shiip/public-api/v2/a5/gen-token`,
      test: `${test}/shiip/public-api/v2/a5/gen-token`,
      method: 'POST'
    },
    returnOrder: {
      production: `${production}/shiip/public-api/v2/switch-status/return`,
      test: `${test}/shiip/public-api/v2/switch-status/return`,
      method: 'POST'
    },
    cancelOrder: {
      production: `${production}/shiip/public-api/v2/switch-status/cancel`,
      test: `${test}/shiip/public-api/v2/switch-status/cancel`,
      method: 'POST'
    }
  },
  service: {
    getServices: {
      production: `${production}/shiip/public-api/v2/shipping-order/available-services`,
      test: `${test}/shiip/public-api/v2/shipping-order/available-services`,
      method: 'POST'
    },
    calculateFee: {
      production: `${production}/shiip/public-api/v2/shipping-order/fee`,
      test: `${test}/shiip/public-api/v2/shipping-order/fee`,
      method: 'POST'
    },
    calculateExpectedDeliveryTime: {
      production: `${production}/shiip/public-api/v2/shipping-order/leadtime`,
      test: `${test}/shiip/public-api/v2/shipping-order/leadtime`,
      method: 'POST'
    }
  },
  address: {
    getProvinces: {
      production: `${production}/shiip/public-api/master-data/province`,
      test: `${test}/shiip/public-api/master-data/province`,
      method: 'GET'
    },
    getDistricts: {
      production: `${production}/shiip/public-api/master-data/district`,
      test: `${test}/shiip/public-api/master-data/district`,
      method: 'GET'
    },
    getWards: {
      production: `${production}/shiip/public-api/master-data/ward`,
      test: `${test}/shiip/public-api/master-data/ward`,
      method: 'GET'
    },
    getStations: {
      production: `${production}/shiip/public-api/v2/station/get`,
      test: `${test}/shiip/public-api/v2/station/get`,
      method: 'GET'
    }
  },
  store: {
    getStores: {
      production: `${production}/shiip/public-api/v2/shop/all`,
      test: `${test}/shiip/public-api/v2/shop/all`,
      method: 'POST'
    },
    createStore: {
      production: `${production}/shiip/public-api/v2/shop/register`,
      test: `${test}/shiip/public-api/v2/shop/register`,
      method: 'GET'
    },
    addStaff: {
      production: `${production}/shiip/public-api/v2/shop/add-client`,
      test: `${test}/shiip/public-api/v2/shop/add-client`,
      method: 'POST'
    },
    deliverAgain: {
      production: `${production}/shiip/public-api/v2/switch-status/storing`,
      test: `${test}/shiip/public-api/v2/switch-status/storing`,
      method: 'POST'
    }
  },
  ticket: {
    getTicket: {
      production: `${production}/shiip/public-api/ticket/detail`,
      test: `${test}/shiip/public-api/ticket/detail`,
      method: 'GET'
    },
    createTicket: {
      production: `${production}/shiip/public-api/ticket/create`,
      test: `${test}/shiip/public-api/ticket/create`,
      method: 'POST'
    },
    addFeedback: {
      production: `${production}/shiip/public-api/ticket/reply`,
      test: `${test}/shiip/public-api/ticket/reply`,
      method: 'POST'
    }
  }
};

export interface IRequestOptions {
  query?: any;
  body?: any;
}

export interface IEndpoint {
  production: string;
  test: string;
  method: string | 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface IOptions {
  test?: boolean;
}

export interface IResponse {
  code?: number;
  message?: string;
  data?: any;
}

export interface IProvince {
  province_id: number;
  name: string;
  code: string;
}

export interface IDistrict {
  district_id: number;
  province_id: number;
  name: string;
  code: string;
  type: string;
  support_type: string;
}

export interface IWard {
  code: string;
  district_id: number;
  name: string;
}

export interface IStationRequest {
  district_id?: number;
  ward_code?: string;
  offset?: number;
  limit?: number;
}

export interface IStation {
  address: string;
  code: string;
  id: number;
  name: string;
  parent: Array<string>;
  email: string;
  latitude: number;
  longitude: number;
}

export interface IPagination {
  offset?: number;
  limit?: number;
}
/**
 * Store
 */
export interface IStore {
  _id?: number;
  name: string;
  phone: string;
  address: string;
  ward_code?: string;
  district_id?: number;
  client_id?: number;
  bank_account_id?: number;
  status?: number;
  location?: any;
  version_no?: string;
  updated_ip?: string;
  updated_employee?: number;
  updated_client?: number;
  updated_source?: string;
  updated_date?: string;
  created_ip?: string;
  created_employee?: number;
  created_client?: number;
  created_source?: string;
  created_date?: string;
}

export interface IStoreDeliveryAgainResponse {
  order_code: string;
  result: boolean;
  message: string;
}

export interface IStoreCreateResponse {
  shop_id?: number;
  // Error
  message?: string;
}

export interface IStoreClientResponse {
  client_shop_id?: number;
  // Error
  message?: string;
}
/**
 * Ticket
 */
export interface ITicketRequest {
  c_email: string;
  order_code: string;
  category: string | 'Tư vấn' | 'Hối Giao/Lấy/Trả hàng' | 'Thay đổi thông tin' | 'Khiếu nại';
  description: string;
  attachments?: any;
}

export interface ITicketResponse {
  attachments?: any;
  c_email?: string;
  c_name?: string;
  client_id?: string;
  conversations?: Array<any>;
  created_at?: string;
  created_by?: number;
  description?: string;
  id?: number;
  order_code?: string;
  status?: string;
  status_id?: number;
  type?: string;
  updated_at?: string;
  // Error
  message?: string;
}

export interface IFeedbackRequest {
  description: string;
  attachments?: any;
}

export interface IFeedbackResponse {
  body?: string;
  created_at?: string;
  from_email?: string;
  updated_at?: string;
  user_id?: number;
  // Error
  message?: string;
}
/**
 * Service
 */
export interface IService {
  short_name: string;
  service_id: number;
  service_type_id: number;
}

export interface IServiceCalculateFeeRequest {
  service_id: number;
  service_type_id?: number;
  insurance_value?: number;
  coupon?: string;
  to_ward_code: string;
  to_district_id: number;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface IServiceCalculateFeeResponse {
  total?: number;
  service_fee?: number;
  insurance_fee?: number;
  pick_station_fee?: number;
  coupon_value?: number;
  r2s_fee?: number;
}

export interface IServiceCalculateTimeRequest {
  from_district_id: number;
  from_ward_code: string;
  to_district_id: number;
  to_ward_code: string;
  service_id: number;
}

export interface IServiceCalculateTimeResponse {
  leadtime?: number;
  order_date?: number;
  // Error
  message?: string;
}
/**
 * Order
 */

export interface IOrderCreateRequest {
  // To
  to_name: string;
  to_phone: string;
  to_address: string;
  to_ward_code: string;
  to_district_id: number;
  // Return
  return_phone?: string;
  return_address?: string;
  return_district_id?: number;
  return_ward_code?: string;
  // Service
  service_id: number;
  service_type_id: number;
  // Content
  content: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  // Other Required
  payment_type_id: number | 1 | 2;
  required_note: string | 'CHOTHUHANG' | 'CHOXEMHANGKHONGTHU' | 'KHONGCHOXEMHANG';

  client_order_code?: string;
  cod_amount?: number;

  pick_station_id?: number;
  insurance_value?: number;
  coupon?: string;
  note?: string;
  items?: Array<IOrderItem>;

  deliver_station_id?: number;
}

export interface IOrderItem {
  name?: string;
  code?: string;
  quantity?: number;
  price?: number;
  length?: number;
  width?: number;
  height?: number;
  category?: any;
}

export interface IOrder {
  order_code?: string;
  client_order_code?: string;

  shop_id?: number;
  client_id?: number;
  return_name?: string;
  return_phone?: string;
  return_address?: string;
  return_ward_code?: string;
  return_district_id?: number;
  from_name?: string;
  from_phone?: string;
  from_address?: string;
  from_ward_code?: string;
  from_district_id?: number;
  deliver_station_id?: number;
  to_name?: string;
  to_phone?: string;
  to_address?: string;
  to_ward_code?: string;
  to_district_id?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  converted_weight?: number;
  service_type_id?: number;
  service_id?: number;
  payment_type_id?: number;
  custom_service_fee?: number;
  cod_amount?: number;
  cod_collect_date?: null;
  cod_transfer_date?: null;
  is_cod_transferred?: false;
  is_cod_collected?: false;
  insurance_value?: number;
  order_value?: number;
  pick_station_id?: number;
  required_note?: string;
  content?: string;
  note?: string;
  employee_note?: string;
  seal_code?: string;
  pickup_time?: string;
  items?: Array<IOrderItem>;
  coupon?: string;
  _id?: string;
  version_no?: string;
  updated_ip?: string;
  updated_employee?: number;
  updated_client?: number;
  updated_source?: string;
  updated_date?: string;
  updated_warehouse?: number;
  created_ip?: string;
  created_employee?: number;
  created_client?: number;
  created_source?: string;
  created_date?: string;
  status?: string;
  pick_warehouse_id?: number;
  deliver_warehouse_id?: number;
  current_warehouse_id?: number;
  return_warehouse_id?: number;
  next_warehouse_id?: number;
  leadtime?: string;
  order_date?: string;
  soc_id?: string;
  finish_date?: string;
  tag?: Array<string>;
  log?: Array<ILog>;
  is_partial_return?: boolean;
  // Error
  message?: string;
}

export interface ILog {
  status?: string;
  updated_date?: string;
}

export interface IOrderFee {
  _id?: string;
  order_code?: string;
  detail?: IOrderFeeDetail;
  payment?: Array<IOrderFeePayment>;
  cod_collect_date?: string;
  transaction_id?: string;
  created_ip?: string;
  created_date?: string;
  updated_ip?: string;
  updated_client?: number;
  updated_employee?: number;
  updated_source?: string;
  updated_date?: string;
  // Error
  message?: string;
}

export interface IOrderFeeDetail {
  main_service?: number;
  insurance?: number;
  station_do?: number;
  station_pu?: number;
  return?: number;
  r2s?: number;
  coupon?: number;
}

export interface IOrderFeePayment {
  value?: number;
  payment_type?: number;
  paid_date?: string;
  created_date?: string;
}

export interface IOrderUpdateRequest {
  // From
  from_name?: string;
  from_phone?: string;
  from_address?: string;
  from_ward_code?: string;
  // To
  to_name?: string;
  to_phone?: string;
  to_ward_code?: string;
  to_district_id?: number;
  // Return
  return_phone?: string;
  return_address?: string;
  return_district_id?: number;
  return_ward_code?: string;

  client_order_code?: string;
  cod_amount?: number;
  content?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  pick_station_id?: number;
  insurance_value?: number;
  coupon?: string;
  service_type_id?: number;
  service_id?: number;
  payment_type_id?: number | 1 | 2;
  note?: string;
  required_note?: string | 'CHOTHUHANG' | 'CHOXEMHANGKHONGTHU' | 'KHONGCHOXEMHANG';
}

export interface IOrderReturnResponse {
  order_code?: string;
  result?: boolean;
  message?: string;
}

export interface IOrderCancelResponse {
  order_code: string;
  result: boolean;
  message: string;
}

export interface IOrderPrintResponse {
  url?: string;
  // Error
  message?: string;
}

export interface IOrderUpdateResponse {
  message: string;
}
