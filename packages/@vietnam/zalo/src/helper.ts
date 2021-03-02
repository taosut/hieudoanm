'use strict';

class Helper {
  public convertObjectToQueryString(o: any): string {
    const keys = Object.keys(o);
    return keys
      .map(key => {
        const value: string = o[key].toString();
        return `${key}=${value}`;
      })
      .join('&');
  }
}

const helper: Helper = new Helper();

export default helper;
