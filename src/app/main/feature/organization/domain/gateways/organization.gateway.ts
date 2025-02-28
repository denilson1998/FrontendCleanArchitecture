import { Observable } from 'rxjs';
import { ListOrganizationModel } from '../../infrastructure/models/list.model';
import { OrganizationModel } from '../../infrastructure/models/organization.model';
import { OrganizationEntity } from '../entities/organization.entity';

export abstract class OrganizationGateway {
  abstract add(params: OrganizationModel): Observable<OrganizationEntity>;
  abstract getCurrentOrganization(): Observable<OrganizationEntity>;
  abstract edit(params: OrganizationModel): Observable<OrganizationEntity>;
  abstract get(): Observable<ListOrganizationModel>;
}
