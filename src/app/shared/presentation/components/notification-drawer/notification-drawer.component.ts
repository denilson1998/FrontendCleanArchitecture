import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import { NotificationCardComponent } from '../cards/notification-card/notification-card.component';

@Component({
  selector: 'notification-drawer',
  templateUrl: './notification-drawer.component.html',
  standalone: true,
  imports: [CommonModule, NotificationCardComponent],
  styleUrls: ['./notification-drawer.component.scss']
})
export class NotificationDrawerComponent {

  @Input() notificationIsOpen: boolean = false;
  @Output() closeNotificationDrawerEvent = new EventEmitter<boolean>();

  notificationDrawerOpened: boolean = false;

  toggleNotificationDrawer(){
    this.notificationDrawerOpened = !this.notificationDrawerOpened;
  }

  closeMenu(){

    this.notificationDrawerOpened = false;
    this.closeNotificationDrawerEvent.emit(false);
  }
}
