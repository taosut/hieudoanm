import { Injectable } from "@angular/core";

type Position = "head" | "tail";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}

  public capitalize(s: string = ""): string {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Numbers
   */
  public addZero(i: number = 0, position: Position = "head"): string {
    return i > 9 ? `${i}` : position ? "0" + i.toString() : i.toString() + "0";
  }

  public numberFormatter(x: number = 0): string {
    let [whole, decimal = "0"] = x.toString().split(".");
    let updatedDecimal: number = parseInt(decimal, 10);
    const finalDecimal = this.addZero(updatedDecimal);
    const updatedWhole: string = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return finalDecimal ? `${updatedWhole}.${finalDecimal}` : updatedWhole;
  }

  public isEmpty(obj: any): boolean {
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  public detectMobileAndTablet(): boolean {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
  }
}
