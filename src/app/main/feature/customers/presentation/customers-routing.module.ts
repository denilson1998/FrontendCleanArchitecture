import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent,
  },
  {
    path: ':customerId',
    component: CustomerPageComponent,
  },
  {
    path: '**',
    component: CustomersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
