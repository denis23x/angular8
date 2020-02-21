import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public event: EventEmitter<any>;

  constructor() {
    this.event = new EventEmitter();
  }

  public addNotify(params: object): void {
    this.event.emit(params);
  }

}
