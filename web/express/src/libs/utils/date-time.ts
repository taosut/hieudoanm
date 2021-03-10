'use strict';

export interface ITime {
  year: number;
  month: number;
  date: number;
  day: number;
  hours: number;
  minutes: number;
  timestamp: number;
}

export default class DateTime {
  public getTime(timeZone: number = 7): ITime {
    const timezoneOffset: number = new Date().getTimezoneOffset();
    const serverTimezone: number = timezoneOffset / -60;
    const timezoneDiff: number = timeZone - serverTimezone;
    const now: number = Date.now();
    const d: Date = new Date(now + timezoneDiff * 60 * 60 * 1000);
    const year: number = d.getFullYear();
    const month: number = d.getMonth() + 1;
    const date: number = d.getDate();
    const day: number = d.getDay();
    const hours: number = d.getHours();
    const minutes: number = d.getMinutes();
    const timestamp: number = d.getTime();

    return { year, month, date, day, hours, minutes, timestamp };
  }
}
