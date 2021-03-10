import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  @Output() notify: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public async publish(message: string) {
    this.notify.emit(message);
  }
}
