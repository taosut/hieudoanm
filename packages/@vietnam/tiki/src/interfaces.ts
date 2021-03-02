export interface TikiConfigs {
  apiKey: string;
  base?: string;
}

export interface ProductInfo {
  category_id: number;
  name: string;
  description: string;
  market_price: number;
  attributes: Attributes;
  image: string;
  images: Array<string>;
  option_attributes: Array<string>;
  variants: Array<Variant>;
}

interface Attributes {
  bulky: number;
  origin: string;
  product_top_features: string;
  brand: string;
  case_diameter: string;
  filter_case_diameter: string;
  band_material: string;
  filter_band_material: string;
  brand_origin: string;
  require_expiry_date: number;
}

interface Variant {
  sku: string;
  price: number;
  market_price: number;
  inventory_type: string;
  supplier: number;
  quantity: number;
  brand_origin: string;
  image: string;
  images: Array<string>;
}

export interface TrackingQueryParams {
  limit?: number;
  created_at_min?: string;
  created_at_max?: string;
  updated_at_min?: string;
  updated_at_max?: string;
}

export interface ProductQueryParams {
  name?: string;
  active?: number;
  category_id?: number;
  page?: number;
  limit?: number;
  created_from_date?: string;
  created_to_date?: string;
  updated_from_date?: string;
  updated_to_date?: string;
}

export interface RequestQueryParams {
  page?: number;
  limit?: number;
  state?: string;
}

export interface OrderQueryParams {
  status?: string;
  page?: number;
  limit?: number;
  created_from_date?: string;
  created_to_date?: string;
  updated_from_date?: string;
  updated_to_date?: string;
}

export interface OrderItemsInfo {
  order_code: string;
  item_ids: Array<number>;
  warehouse_id: string;
  delivery_commitment_time: string;
  tracking_number: string;
}

export interface OrderDeliveryStatus {
  order_code: string;
  update_time: string;
  status: string;
}

export interface OrderData {
  fulfillment_type: string;
  payment_method: string;
  items: Array<Item>;
  coupon_code: string;
  discount_coupon: number;
  discount_tiki_point: number;
  shipping: Shipping;
  tax: Tax;
  note: string;
}

interface Item {
  product_name: string;
  original_sku: string;
  price: number;
  qty: number;
  inventory_type: string;
}

interface Shipping {
  name: string;
  street: string;
  ward: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  email: string;
  estimate_description: string;
  shipping_fee: number;
}

interface Tax {
  code: string;
  name: string;
  address: string;
}

export interface Webhook {
  uri: string;
  event: string;
}
