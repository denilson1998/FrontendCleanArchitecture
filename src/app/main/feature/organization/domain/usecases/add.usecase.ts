import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/main/feature/organization/infrastructure/models/organization.model';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationGateway } from '../gateways/organization.gateway';

export class OrganizationAddUseCase
  implements UseCase<OrganizationModel, OrganizationEntity>
{
  constructor(private organizationRepository: OrganizationGateway) {}
  execute(params: OrganizationModel): Observable<OrganizationEntity> {
    return this.organizationRepository.add(params);
  }
}
