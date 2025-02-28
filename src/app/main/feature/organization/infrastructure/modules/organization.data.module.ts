import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrganizationGateway } from '../../domain/gateways/organization.gateway';
import { OrganizationAddUseCase } from '../../domain/usecases/add.usecase';
import { OrganizationEditUseCase } from 'src/app/main/feature/organization/domain/usecases/edit.usecase';
import { OrganizationGetCurrentUseCase } from 'src/app/main/feature/organization/domain/usecases/get-current-organization.usecase';
import { OrganizationService } from '../services/organization.service';

const OrganizationUseCaseFactory = (organizationRepo: OrganizationGateway) =>
  new OrganizationAddUseCase(organizationRepo);

export const addUseCaseProvider = {
  provide: OrganizationAddUseCase,
  useFactory: OrganizationUseCaseFactory,
  deps: [OrganizationGateway],
};

export const getCurrentUseCaseProvider = {
  provide: OrganizationGetCurrentUseCase,
  useFactory: OrganizationUseCaseFactory,
  deps: [OrganizationGateway],
};

export const editUseCaseProvider = {
  provide: OrganizationEditUseCase,
  useFactory: OrganizationUseCaseFactory,
  deps: [OrganizationGateway],
};

@NgModule({
  providers: [
    addUseCaseProvider,
    {
      provide: OrganizationGateway,
      useClass: OrganizationService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class OrganizationDataModule {}
