import { Observable } from 'rxjs';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { ListProductEntity } from '../entities/list-product.entity';

export abstract class ProductGateway {
  abstract getByOrganization(params: DataOptions): Observable<ListProductEntity>;
}
