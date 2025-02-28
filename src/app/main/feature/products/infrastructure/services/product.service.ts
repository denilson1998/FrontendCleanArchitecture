import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListProductEntity } from 'src/app/main/feature/products/domain/entities/list-product.entity';
import { ProductEntity } from 'src/app/main/feature/products/domain/entities/product.entity';
import { ProductGateway } from 'src/app/main/feature/products/domain/gateway/product.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { environment } from 'src/environments/environment';
import { OrganizationMapper } from '../../../organization/infrastructure/helpers/mappers/organization.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductGateway {
  organizationMapper = new OrganizationMapper();
  constructor(private apiService: ApiService) {
    super();
  }


  getByOrganization(dataOptions: DataOptions): Observable<ListProductEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    
    return this.apiService
      .getwithPagination<ListProductEntity>(
        `${environment.stocksApi}/organizations/${userInfo.currentOrganizationId}/products`,
        dataOptions)
      .pipe(map((data) => {
        data.result.forEach((item)=>{
          item = new ProductEntity(item)
        })
        return data
      }));
  }
}
