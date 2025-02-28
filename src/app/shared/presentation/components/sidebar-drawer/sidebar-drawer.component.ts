import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jichi-sidebar',
  templateUrl: './sidebar-drawer.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SidebarDrawerComponent {

  @Input() sideBarDrawerIsOpen: boolean = false;
  @Output() closeSideBarDrawerEvent = new EventEmitter<boolean>();

  sideBarDrawerOpened: boolean = false;

  toggleNotificationDrawer(){
    this.sideBarDrawerOpened = !this.sideBarDrawerOpened;
  }

  closeMenu(){
    this.sideBarDrawerOpened = false;
    this.closeSideBarDrawerEvent.emit(false);
  }
}
