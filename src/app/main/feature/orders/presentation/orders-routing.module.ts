import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrdersComponent,
  },
  {
    path: 'create',
    component: CreateOrderComponent,
  },
  {
    path: '**',
    component: ListOrdersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
