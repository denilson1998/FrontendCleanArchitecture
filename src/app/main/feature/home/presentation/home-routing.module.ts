import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/domain/guard/auth.guard';
import { ListOrdersComponent } from '../../orders/presentation/pages/list-orders/list-orders.component';
import { OrganizationFormComponent } from '../../organization/presentation/organization-form/organization-form.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            'src/app/main/feature/orders/presentation/orders.module'
          ).then((m) => m.OrdersModule),
      },
      {
        path: 'clientes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            'src/app/main/feature/customers/presentation/customers.module'
          ).then((m) => m.CustomersModule),
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            'src/app/main/feature/users/presentation/users.module'
          ).then((m) => m.UsersModule),
      },
      {
        path: 'organization',
        component: OrganizationFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import(
            'src/app/main/feature/products/presentation/products.module'
          ).then((m) => m.ProductsModule),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import(
            'src/app/main/feature/qr-payments/presentation/qr-payments.module'
          ).then((m) => m.QrPaymentsModule),
          canActivate: [AuthGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
    ],
  },
  {
    path: 'organization',
    component: OrganizationFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },

  {
    path: 'organization/edit',
    component: OrganizationFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
