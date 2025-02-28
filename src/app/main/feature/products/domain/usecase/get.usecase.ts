import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { ListProductEntity } from 'src/app/main/feature/products/domain/entities/list-product.entity';
import { ProductGateway } from '../gateway/product.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';

export class ProductGetByOrganizationUseCase
  implements UseCase<DataOptions, ListProductEntity>
{
  constructor(private productRepository: ProductGateway) {}
  execute(params: DataOptions): Observable<ListProductEntity> {
    return this.productRepository.getByOrganization(params);
  }
}