import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public setSessionStorage(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public removeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clearSessionStorage(): void {
    sessionStorage.clear();
  }

  public setCookie(key: string, value: string, expiredHours: number = 1): void {
    const d: Date = new Date();
    d.setTime(d.getTime() + expiredHours * 60 * 60 * 1000);
    const expires: string = 'expires=' + d.toUTCString();
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
  }

  public getCookie(key: string): string {
    const name: string = key + '=';
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const ca: Array<string> = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c: string = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
