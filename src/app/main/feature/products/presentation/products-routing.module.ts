import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products.component';
import { AuthGuard } from '../../auth/domain/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lista',
        loadComponent: () => import ('./products-list/products-list.component')
        .then(mod => mod.ProductsListComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
