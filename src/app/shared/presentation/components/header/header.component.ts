import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../helpers/directives/click-outside.directive';
import { NotificationDrawerComponent } from '../notification-drawer/notification-drawer.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, NotificationDrawerComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuMobileOpen: boolean = false;
  menuUserOpen: boolean = false;
  menuHelpOpen: boolean = false;
  notificationOpen: boolean = false;
  constructor(
  ) {

  }
  ngOnInit(): void {
  }
  

  public onOutsideClick(event: any): void {
    this.menuUserOpen = false;
    this.menuHelpOpen = false;
  }

  toggleMenuMobile(){
    this.menuMobileOpen = !this.menuMobileOpen;
  }
  

  toggleUserMenu(){
    this.menuUserOpen = !this.menuUserOpen;
    this.menuHelpOpen = false;
  }

  toggleHelpMenu(){
    this.menuHelpOpen = !this.menuHelpOpen;
    this.menuUserOpen = false;
  }
 

  openNotificationDrawer(){
    this.notificationOpen = true;
  }


  closeNotificationDrawer(){
    this.notificationOpen = false;
  }
}

