import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProductGateway } from '../../domain/gateway/product.gateway';
import { ProductGetByOrganizationUseCase } from '../../domain/usecase/get.usecase';
import { ProductService } from '../services/product.service';

const ProductUseCaseFactory = (productRepo: ProductGateway) =>
  new ProductGetByOrganizationUseCase(productRepo);

export const getByOrganizationUseCaseProvider = {
  provide: ProductGetByOrganizationUseCase,
  useFactory: ProductUseCaseFactory,
  deps: [ProductGateway],
};

@NgModule({
  providers: [
    getByOrganizationUseCaseProvider,
    {
      provide: ProductGateway,
      useClass: ProductService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ProductDataModule {}
