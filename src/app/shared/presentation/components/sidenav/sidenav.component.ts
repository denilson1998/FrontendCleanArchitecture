import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';
import { MenuOption } from 'src/app/shared/domain/entities/menu-options';

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isOpen = true;
  hasOpenSubNavbar = false;
  organizations?: any[];
  currentOrganizationId?: number;
  organizationsOptions?: {viewValue: string, value: number}[];

  menuItems = [
    {
      id: 1,
      nombre : 'organización',
      ruta : '/',
      childItems : [
        {
          id: 1,
          nombre: 'crear',
          ruta: '/organization'
        }
      ]
    },
    {
      id: 2,
      nombre : 'productos',
      ruta : '/products',
      childItems : [
        {
          id: 1,
          nombre: 'lista',
          ruta: '/products/lista'
        }
      ]
    }
  ];

  openedSubmenu?: any = this.menuItems[0]
  options: MenuOption[] = [
    {
      option: 'Inventario',
      route: '',
      icon: 'inventory-filled-no',
      lastOption: '',
    },
    {
      option: 'Ventas',
      route: '',
      icon: 'cart-filled-no',
      lastOption: '',
    },
    {
      option: 'Estadisticas',
      route: 'Estadisticas',
      icon: 'stadistic-filled-no',
      children: [
        {
          option: 'Option 1',
        },
        {
          option: 'Option 2',
        },
        {
          option: 'Option 3',
        },
      ],
    },
    {
      option: 'Clientes',
      route: 'Clientes',
      icon: 'profile-filled-no',
      lastOption: '',
    },
    {
      option: 'Usuarios',
      route: 'Usuarios',
      icon: 'users-filled-no',
      children: [
        {
          option: 'Option 1',
        },
        {
          option: 'Option 2',
        },
        {
          option: 'Option 3',
        },
      ],
    },
    {
      option: 'Delivery',
      route: 'Delivery',
      icon: 'delivery-filled-no',
      lastOption: '',
    },
    {
      option: 'Panel QR',
      route: 'Panel',
      icon: 'qr-light',
      children: [
        {
          option: 'Option 1',
        },
        {
          option: 'Option 2',
        },
        {
          option: 'Option 3',
        },
      ],
    },
  ];
  constructor(
    public authService: UserGateway,
    private router: Router,
  ) {  }
  
  async ngOnInit() {
  }


  selectModule(module: any) {
    this.openedSubmenu = module;
    this.hasOpenSubNavbar = true;
    this.isOpen = false;
  }

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.hasOpenSubNavbar = !this.hasOpenSubNavbar;
  }

  logout() {
    this.router.navigateByUrl('/login')
  }

}
