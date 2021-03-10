import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { signOut } from '../store/actions';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>,
    private storageService: StorageService
  ) {}

  private httpErrorHandler(error: HttpErrorResponse) {
    const { status } = error;
    switch (status) {
      case 401:
        this.storageService.setCookie('isAuthenticated', 'false');
        this.storageService.setCookie('token', '');
        this.store.dispatch(signOut({ token: '', isAuthenticated: false }));
        this.router.navigateByUrl('/');
        break;
      default:
        console.error(error);
    }
  }

  public async get(url: string, token: any = ''): Promise<any> {
    const self = this;
    let headers = new HttpHeaders();
    if (token) headers = headers.set('x-token', token);
    return new Promise(resolve => {
      self.http.get(url, { headers }).subscribe(
        (res: any) => resolve(res),
        (error: HttpErrorResponse) => {
          self.httpErrorHandler(error);
          resolve({});
        }
      );
    });
  }

  public async post(url: string, body: Object, token: any = ''): Promise<any> {
    const self = this;
    let headers = new HttpHeaders();
    if (token) headers = headers.set('x-token', token);
    return new Promise(resolve => {
      self.http.post(url, body, { headers }).subscribe(
        (res: any) => resolve(res),
        (error: HttpErrorResponse) => {
          self.httpErrorHandler(error);
          resolve({});
        }
      );
    });
  }

  public async put(url: string, body: Object, token: any = ''): Promise<any> {
    let headers = new HttpHeaders();
    if (token) headers = headers.set('x-token', token);
    return new Promise(resolve => {
      this.http.put(url, body, { headers }).subscribe(
        (res: any) => resolve(res),
        (error: HttpErrorResponse) => {
          console.error(error);
          resolve({});
        }
      );
    });
  }

  public async patch(url: string, body: Object, token: any = ''): Promise<any> {
    const self = this;
    let headers = new HttpHeaders();
    if (token) headers = headers.set('x-token', token);
    return new Promise(resolve => {
      self.http.patch(url, body, { headers }).subscribe(
        (res: any) => resolve(res),
        (error: HttpErrorResponse) => {
          self.httpErrorHandler(error);
          resolve({});
        }
      );
    });
  }

  public async delete(url: string, token: any = ''): Promise<any> {
    const self = this;
    let headers = new HttpHeaders();
    if (token) headers = headers.set('x-token', token);
    return new Promise(resolve => {
      self.http.delete(url, { headers }).subscribe(
        (res: any) => resolve(res),
        (error: HttpErrorResponse) => {
          self.httpErrorHandler(error);
          resolve({});
        }
      );
    });
  }
}
