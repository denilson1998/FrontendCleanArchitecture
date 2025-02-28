import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrganizationEntity } from 'src/app/main/feature/organization/domain/entities/organization.entity';
import { OrganizationGateway } from 'src/app/main/feature/organization/domain/gateways/organization.gateway';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { environment } from 'src/environments/environment';
import { OrganizationMapper } from '../helpers/mappers/organization.mapper';
import { ListOrganizationModel } from '../models/list.model';
import { OrganizationModel } from '../models/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends OrganizationGateway {
  organizationMapper = new OrganizationMapper();
  constructor(private apiService: ApiService) {
    super();
  }

  get(): Observable<ListOrganizationModel> {
    return this.apiService
      .get<ListOrganizationModel>(`${environment.onboardingApi}/organizations`)
      .pipe(map((data) => data));
  }

  add(params: OrganizationModel): Observable<OrganizationEntity> {
    var newForm = new FormData();
    newForm.append('Name', params.name!);
    newForm.append('PhoneNumber', params.phoneNumber?.toString()!);
    newForm.append('Address ', params.address!);
    params.businessSectors.forEach((sector) => {
      newForm.append('BusinessSectors', sector);
    });
    newForm.append('FacebookUrl', params.facebookUrl!);
    newForm.append('InstagramUrl', params.instagramUrl!);
    newForm.append('Currency', params.currency);

    return this.apiService
      .post<OrganizationEntity>(
        `${environment.onboardingApi}/organizations`,
        newForm
      )
      .pipe(
        map((data: OrganizationEntity) => {
          this.setCurrentOrganization(data.id);
          return data;
        })
      );
  }

  edit(params: OrganizationModel): Observable<OrganizationEntity> {
    var newForm = new FormData();

    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    newForm.append('Name', params.name!);
    newForm.append('PhoneNumber', params.phoneNumber?.toString()!);
    newForm.append('Address', params.address!);
    newForm.append('FacebookUrl', params.facebookUrl!);
    newForm.append('InstagramUrl', params.instagramUrl!);
    newForm.append('Currency', params.currency);

    return this.apiService.patch<OrganizationEntity>(
      `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}`,
      newForm
    );
  }

  getCurrentOrganization(): Observable<OrganizationEntity> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService.get<OrganizationEntity>(
      `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}`
    );
  }

  public async setCurrentOrganization(organizationId: any) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    var organization = userInfo.organizationRoles.find(
      (o: any) => o.organizationId === organizationId
    );
    if (organization == null) {
      console.error('Organization not found');
    }
    userInfo.currentOrganizationId = organization.organizationId;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
}
