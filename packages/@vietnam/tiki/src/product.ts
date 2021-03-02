'use strict';

import {
  TikiConfigs,
  TrackingQueryParams,
  RequestQueryParams,
  ProductQueryParams,
  ProductInfo
} from './interfaces';

import helper from './helper';

export default class Product {
  private base: string = '';
  private apiKey: string = '';

  constructor(configs: TikiConfigs) {
    const { apiKey = '', base = '' } = configs;
    this.apiKey = apiKey;

    this.base = base;
  }

  private apiRequest(
    method: string = '',
    endpoint: string = '',
    body: any = {}
  ): Promise<Array<any>> {
    const self = this;
    const { apiKey = '' } = self;
    const url: string = `${self.base}/${endpoint}`;
    let options = {
      method,
      headers: { 'tiki-api': apiKey, 'Content-Type': 'application/json;charset=UTF-8' }
    };
    options = Object.keys(body).length ? Object.assign(options, { body }) : options;
    return new Promise(resolve => {
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
  /**
   * Brands
   */
  public async getBrandByName(name: string): Promise<any> {
    name = name.trim().toLowerCase();
    return await this.apiRequest('GET', `brands?name=${name}`);
  }
  /**
   * Categories
   */
  public async getCategories(name: string): Promise<any> {
    name = name.trim().toLowerCase();
    return await this.apiRequest('GET', `categories?name=${name}`);
  }

  public async getCategoryDetail(category_id: string): Promise<any> {
    category_id = category_id.trim().toLowerCase();
    return await this.apiRequest('GET', `categories/${category_id}`);
  }
  /**
   * Certificate Files
   */
  public async getCertificateFilesByCategory(category_id: string): Promise<any> {
    category_id = category_id.trim().toLowerCase();
    return await this.apiRequest('GET', `categories/${category_id}/certificateFiles`);
  }
  /**
   * Requests
   */
  public async createProduct(product: ProductInfo): Promise<any> {
    return await this.apiRequest('POST', `requests`, product);
  }

  public async getRequests(queryParams: RequestQueryParams): Promise<any> {
    const queryParamsString = helper.convertObjectToQueryString(queryParams);
    return await this.apiRequest('GET', `requests?${queryParamsString}`);
  }

  public async updateProductInfo(id: string, info: ProductInfo): Promise<any> {
    const body = Object.assign({ id }, info);
    return await this.apiRequest('POST', `requests/updateProductInfo`, body);
  }

  public async getProductRequest(request_id: string): Promise<any> {
    return await this.apiRequest('GET', `requests/${request_id}`);
  }

  public async deleteProductRequest(request_id: string): Promise<any> {
    return await this.apiRequest('DELETE', `requests/${request_id}`);
  }

  public async getProductRequestByTrackId(track_id: string): Promise<any> {
    return await this.apiRequest('GET', `requests/findBy?track_id=${track_id}`);
  }
  /**
   * Tracking
   */
  public async trackProductRequests(queryParams: TrackingQueryParams): Promise<any> {
    const queryParamsString = helper.convertObjectToQueryString(queryParams);
    return await this.apiRequest('GET', `tracking?${queryParamsString}`);
  }

  public async trackProductRequest(track_id: string): Promise<any> {
    return await this.apiRequest('GET', `tracking/${track_id}`);
  }

  public async replayProductRequest(track_id: string): Promise<any> {
    return await this.apiRequest('GET', `tracking/${track_id}/replay`);
  }
  /**
   * Product
   */
  public async updateProductSKU(
    product_id = '',
    original_sku: string,
    data: any = {}
  ): Promise<any> {
    const { price, quantity, active } = data;
    const body = { original_sku, product_id, price, quantity, active };
    return await this.apiRequest('POST', `products/updateSku`, body);
  }

  public async updateProductOriginalSku(product_id: string, original_sku: string): Promise<any> {
    const body = { product_id, original_sku };
    return await this.apiRequest('POST', `products/updateOriginalSku`, body);
  }

  public async getProducts(queryParams: ProductQueryParams): Promise<any> {
    const queryParamsString = helper.convertObjectToQueryString(queryParams);
    return await this.apiRequest('GET', `products?${queryParamsString}`);
  }

  public async getProduct(product_id: string): Promise<any> {
    return await this.apiRequest('GET', `products/${product_id}`);
  }

  public async getProductBySKU(original_sku: string): Promise<any> {
    return await this.apiRequest('GET', `products/findBy?original_sku=${original_sku}`);
  }
  /**
   * Warehouses
   */
  public async getTikiWarehouses(): Promise<any> {
    return await this.apiRequest('GET', `warehouses/tiki`);
  }
  /**
   * Suppliers
   */
  public async getSuppliers(): Promise<any> {
    return await this.apiRequest('GET', `suppliers`);
  }

  public async getSuppliersByWarehouseCodes(warehouse_codes: Array<string> = []): Promise<any> {
    const warehouseCodesString = warehouse_codes.join(',');
    return await this.apiRequest('GET', `suppliers/findBy?warehouse_codes=${warehouseCodesString}`);
  }
}
