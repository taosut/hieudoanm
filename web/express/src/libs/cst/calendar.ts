'use strict';

type CanEnum = 'Giáp' | 'Ất' | 'Bính' | 'Đinh' | 'Mậu' | 'Kỷ' | 'Canh' | 'Tân' | 'Nhâm' | 'Quý';

type ChiEnum =
  | 'Tý'
  | 'Sửu'
  | 'Dần'
  | 'Mão'
  | 'Thìn'
  | 'Tỵ'
  | 'Ngọ'
  | 'Mùi'
  | 'Thân'
  | 'Dậu'
  | 'Tuất'
  | 'Hợi';

type TietKhiEnum =
  | 'Xuân phân'
  | 'Thanh minh'
  | 'Cốc vũ'
  | 'Lập hạ'
  | 'Tiểu mãn'
  | 'Mang chủng'
  | 'Hạ chí'
  | 'Tiểu thử'
  | 'Đại thử'
  | 'Lập thu'
  | 'Xử thử'
  | 'Bạch lộ'
  | 'Thu phân'
  | 'Hàn lộ'
  | 'Sương giáng'
  | 'Lập đông'
  | 'Tiểu tuyết'
  | 'Đại tuyết'
  | 'Đông chí'
  | 'Tiểu hàn'
  | 'Đại hàn'
  | 'Lập xuân'
  | 'Vũ thủy'
  | 'Kinh trập';

interface IDate {
  year: number;
  month: number;
  date: number;
}

export default class Calendar {
  private listOfCan: Array<CanEnum> = [
    'Giáp',
    'Ất',
    'Bính',
    'Đinh',
    'Mậu',
    'Kỷ',
    'Canh',
    'Tân',
    'Nhâm',
    'Quý'
  ];
  private listOfChi: Array<ChiEnum> = [
    'Tý',
    'Sửu',
    'Dần',
    'Mão',
    'Thìn',
    'Tỵ',
    'Ngọ',
    'Mùi',
    'Thân',
    'Dậu',
    'Tuất',
    'Hợi'
  ];
  private listOfTietKhi: Array<TietKhiEnum> = [
    'Xuân phân',
    'Thanh minh',
    'Cốc vũ',
    'Lập hạ',
    'Tiểu mãn',
    'Mang chủng',
    'Hạ chí',
    'Tiểu thử',
    'Đại thử',
    'Lập thu',
    'Xử thử',
    'Bạch lộ',
    'Thu phân',
    'Hàn lộ',
    'Sương giáng',
    'Lập đông',
    'Tiểu tuyết',
    'Đại tuyết',
    'Đông chí',
    'Tiểu hàn',
    'Đại hàn',
    'Lập xuân',
    'Vũ thủy',
    'Kinh trập'
  ];
  /**
   * (Solar) date to (Julius) jd
   */
  private jdFromDate(date: number, month: number, year: number): number {
    const a: number = Math.floor((14 - month) / 12);
    const y: number = year + 4800 - a;
    const m: number = month + 12 * a - 3;
    let jd: number =
      date +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    if (jd < 2299161) {
      jd = date + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
  }
  /**
   * (Julius) jd to (Solar) date
   */
  private jdToDate(jd: number): IDate {
    let c = 0,
      b = 0,
      a = 0;
    if (jd > 2299160) {
      a = jd + 32044;
      b = Math.floor((4 * a + 3) / 146097);
      c = a - Math.floor((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const date = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = b * 100 + d - 4800 + Math.floor(m / 10);
    return { year, month, date };
  }
  /**
   * Calculate new Moon Date (Tính ngày Sóc)
   */
  private getNewMoonDay(k: number, timeZone: number = 7) {
    const T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun"s mean anomaly
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon"s mean anomaly
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon"s argument of latitude
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat = 0;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }
  /**
   * Sun Longitude
   */
  private getSunLongitude(jdn: number, timeZone: number = 7): number {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    const T2 = T * T;
    const dr = Math.PI / 180; // degree to radian
    const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
    let L = L0 + DL; // true longitude, degree
    const omega = 125.04 - 1934.136 * T;
    L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
    L = L * dr;
    L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2)); // Normalize to (0, 2*PI)
    return Math.floor((L / Math.PI) * 6);
  }

  private getSunLongitude2(jdn: number): number {
    const T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    const T2 = T * T;
    const dr = Math.PI / 180; // degree to radian
    const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
    const theta = L0 + DL; // true longitude, degree
    // obtain apparent longitude by correcting for nutation and aberration
    const omega = 125.04 - 1934.136 * T;
    let lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
    // Convert to radians
    lambda = lambda * dr;
    lambda = lambda - Math.PI * 2 * Math.floor(lambda / (Math.PI * 2)); // Normalize to (0, 2*PI)
    return lambda;
  }
  /**
   * Tính ngày bắt đầu tháng 11 âm lịch
   */
  private getLunarMonth11(year: number, timeZone: number = 7): number {
    const self = this;
    const off: number = self.jdFromDate(31, 12, year) - 2415021;
    const k: number = Math.floor(off / 29.530588853);
    let newMoonDay: number = self.getNewMoonDay(k, timeZone);
    const sunLongitude = self.getSunLongitude(newMoonDay, timeZone); // sun longitude at local midnight
    if (sunLongitude >= 9) {
      newMoonDay = self.getNewMoonDay(k - 1, timeZone);
    }
    return newMoonDay;
  }
  /**
   * Xác định tháng nhuận
   */
  private getLeapMonthOffset(a11: number, timeZone: number = 7): number {
    const self = this;
    const k: number = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last: number = 0;
    let i: number = 1; // We start with the month following lunar month 11
    let arc: number = self.getSunLongitude(self.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i = i + 1;
      arc = self.getSunLongitude(self.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc != last && i < 14);
    return i - 1;
  }
  /**
   * Leap
   */
  public isSolarLeapYear(year: number): boolean {
    return year % 4 == 0 || (year % 100 == 0 && year % 400 == 0);
  }

  public isLunarLeapYear(year: number): boolean {
    const list: Array<number> = [0, 3, 6, 9, 11, 14, 17];
    const leap: number = year % 19;
    return list.includes(leap);
  }
  /**
   * Solar to Lunar
   */
  public convertSolarToLunar(
    date: number,
    month: number,
    year: number,
    timeZone: number = 7
  ): IDate {
    const self = this;
    const dayNumber = self.jdFromDate(date, month, year);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = self.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = self.getNewMoonDay(k, timeZone);
    }
    let a11: number = self.getLunarMonth11(year, timeZone);
    let b11: number = a11;
    let lunarYear: number = 0;
    if (a11 >= monthStart) {
      lunarYear = year;
      a11 = self.getLunarMonth11(year - 1, timeZone);
    } else {
      lunarYear = year + 1;
      b11 = self.getLunarMonth11(year + 1, timeZone);
    }
    const lunarDate: number = dayNumber - monthStart + 1;
    const diff: number = Math.floor((monthStart - a11) / 29);
    let lunarLeap: number = 0;
    let lunarMonth: number = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = self.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    return { year: lunarYear, month: lunarMonth, date: lunarDate };
  }
  /**
   * Lunar to Solar
   */
  public convertLunarToSolar(
    lunarDate: number,
    lunarMonth: number,
    lunarYear: number,
    lunarLeap: number = 0,
    timeZone: number = 7
  ): IDate {
    const self = this;
    let a11, b11, k;
    if (lunarMonth < 11) {
      a11 = self.getLunarMonth11(lunarYear - 1, timeZone);
      b11 = self.getLunarMonth11(lunarYear, timeZone);
    } else {
      a11 = self.getLunarMonth11(lunarYear, timeZone);
      b11 = self.getLunarMonth11(lunarYear + 1, timeZone);
    }
    k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) {
      off += 12;
    }
    if (b11 - a11 > 365) {
      const leapOff = self.getLeapMonthOffset(a11, timeZone);
      let leapMonth = leapOff - 2;
      if (leapMonth < 0) {
        leapMonth += 12;
      }
      if (lunarLeap != 0 && lunarMonth != leapMonth) {
        return { year: 0, month: 0, date: 0 };
      } else if (lunarLeap != 0 || off >= leapOff) {
        off += 1;
      }
    }
    const monthStart = self.getNewMoonDay(k + off, timeZone);
    return self.jdToDate(monthStart + lunarDate - 1);
  }
  /**
   * Can Chi
   */
  public getListOfCan(): Array<string> {
    return this.listOfCan;
  }

  public getListOfChi(): Array<string> {
    return this.listOfChi;
  }

  public getCanChiOfYear(lunarYear: number): string {
    const self = this;
    const { listOfCan, listOfChi } = self;
    const canIndex: number = (lunarYear + 6) % 10;
    const chiIndex: number = (lunarYear + 8) % 12;
    return `${listOfCan[canIndex]} ${listOfChi[chiIndex]}`;
  }

  public getCanChiOfMonth(lunarMonth: number, lunarYear: number): string {
    const self = this;
    const { listOfCan, listOfChi } = self;
    const canIndex: number = (lunarYear * 12 + lunarMonth + 3) % 10;
    const chiIndex: number = (lunarMonth + 1) % 12;
    return `${listOfCan[canIndex]} ${listOfChi[chiIndex]}`;
  }

  private getCanOfDate(jd: number) {
    const self = this;
    const { listOfCan } = self;
    const canIndex: number = (jd + 9) % 10;
    return listOfCan[canIndex];
  }

  private getChiOfDate(jd: number): string {
    const self = this;
    const { listOfChi } = self;
    const chiIndex = (jd + 1) % 12;
    return listOfChi[chiIndex];
  }

  public getCanChiOfDate(lunarDate: number, lunarMonth: number, lunarYear: number): string {
    const self = this;
    const { date, month, year } = self.convertLunarToSolar(lunarDate, lunarMonth, lunarYear);
    const jd = self.jdFromDate(date, month, year);
    const can = self.getCanOfDate(jd);
    const chi = self.getChiOfDate(jd);
    return `${can} ${chi}`;
  }

  public getCanChiHours(date: number, month: number, year: number): string {
    const self = this;
    const { listOfCan, listOfChi } = self;
    const jd = self.jdFromDate(date, month, year);
    const can = ((jd - 1) * 2) % 10;
    return `${listOfCan[can]} ${listOfChi[0]}`;
  }
  /**
   * Tiet Khi
   */
  public getTietKhi(date: number, month: number, year: number) {
    const self = this;
    const { listOfTietKhi = [] } = self;
    const jd = self.jdFromDate(date, month, year);
    const tietKhiIndex = Math.floor((self.getSunLongitude2(jd + 1 - 0.5 - 7 / 24) / Math.PI) * 12);
    return listOfTietKhi[tietKhiIndex];
  }
}
