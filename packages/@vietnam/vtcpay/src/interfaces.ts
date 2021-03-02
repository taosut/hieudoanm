'use strict';

export interface Configs {
  website_id: string | number;
  secret_key: string;
  url_return: string;
  receiver_account: string;
  test?: boolean;
}

export interface Order {
  amount: number;
  address?: string;
  city?: string;
  email?: string;
  first_name?: string;
  phone?: string;
  family_name?: string;
  country?: string;
  payment_type?: string;
  postcode?: number;
  state?: string;
}
