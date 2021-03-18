export default class Utils {
  public addZero(i: number = 0): string {
    return i > 9 ? `${i}` : `0${i}`;
  }
}
