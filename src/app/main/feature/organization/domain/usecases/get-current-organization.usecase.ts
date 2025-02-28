import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/main/feature/organization/infrastructure/models/organization.model';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrganizationEntity } from 'src/app/main/feature/organization/domain/entities/organization.entity';
import { OrganizationGateway } from 'src/app/main/feature/organization/domain/gateways/organization.gateway';

export class OrganizationGetCurrentUseCase
  implements UseCase<OrganizationModel, OrganizationEntity>
{
  constructor(private organizationRepository: OrganizationGateway) {}
  execute(): Observable<OrganizationEntity> {
    return this.organizationRepository.getCurrentOrganization();
  }
}
