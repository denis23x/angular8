import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notification.service';

export class Notification {
  constructor(
    public id: number,
    public className: string,
    public animName: string,
    public message: string,
    public timeOut: number,
    public isActive: boolean | number
  ) {
    const lifeTime = setTimeout(() => {
      this.isActive = false;
      clearTimeout(lifeTime);
    }, this.timeOut);
  }

}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public notificationList: Array<Notification> = [];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.event.subscribe(({ className, animName, message, delay }) => {
      this.notificationList.push(new Notification(this.notificationList.length, className, (animName ? animName : 'fadeInDown'), message, delay, true));
    });
  }

  onNotificationRemove(notify: Notification): void {
    this.notificationList = this.notificationList.filter(n => n.id !== notify.id);
  }

  getNotificationListActive(): Array<Notification> {
    return this.notificationList.filter(notify => notify.isActive);
  }

}
