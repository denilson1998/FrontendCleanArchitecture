import { Observable } from 'rxjs';
import { ListOrganizationModel } from 'src/app/main/feature/organization/infrastructure/models/list.model';
import { OrganizationModel } from 'src/app/main/feature/organization/infrastructure/models/organization.model';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { OrganizationEntity } from 'src/app/main/feature/organization/domain/entities/organization.entity';
import { OrganizationGateway } from 'src/app/main/feature/organization/domain/gateways/organization.gateway';

export class OrganizationAddUseCase
  implements UseCase<OrganizationEntity, ListOrganizationModel>
{
  constructor(private organizationRepository: OrganizationGateway) {}
  execute(): Observable<ListOrganizationModel> {
    return this.organizationRepository.get();
  }
}
