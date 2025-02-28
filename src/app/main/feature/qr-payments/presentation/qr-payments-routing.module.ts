import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkBankAccountPageComponent } from './link-bank-account-page/link-bank-account-page.component';
import { QrPaymentsComponent } from './qr-payments.component';
import { AuthGuard } from '../../auth/domain/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: QrPaymentsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./qr-codes/qr-codes.component').then(
            (mod) => mod.QrCodesComponent
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./qr-payments-list/qr-payments-list.component').then(
            (mod) => mod.QrPaymentsListComponent
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'link-account',
        loadComponent: () =>
        import('./link-bank-account-page/link-bank-account-page.component').then(
          (mod) => mod.LinkBankAccountPageComponent
        ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'payment',
        
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrPaymentsRoutingModule {}
