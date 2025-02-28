import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { ProductDataModule } from 'src/app/main/feature/products/infrastructure/modules/product.data.module';
import { CreateProductComponent } from 'src/app/main/feature/products/presentation/create/create-product.component';
import { EditProductComponent } from 'src/app/main/feature/products/presentation/edit/edit-product.component';
import {  authInterceptorProviders } from 'src/app/shared/infrastructure/interceptors/auth.interceptor';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsListComponent,
    ProductsRoutingModule,
    RouterModule,
    SectionTitleComponent,
    ProductDataModule,
    CreateProductComponent,
  ],

})
export class ProductsModule { }
