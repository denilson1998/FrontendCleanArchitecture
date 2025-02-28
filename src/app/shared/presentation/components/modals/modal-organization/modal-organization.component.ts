import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrganizationGateway } from 'src/app/main/feature/organization/domain/gateways/organization.gateway';
import { OrganizationModel } from 'src/app/main/feature/organization/infrastructure/models/organization.model';

@Component({
  selector: 'app-modal-organization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-organization.component.html',
  styleUrls: ['./modal-organization.component.scss']
})
export class ModalOrganizationComponent {
  showModal = false;
  organizations : Array<OrganizationModel> = [];
  selectedOrganizationId: number = 0
  constructor(
    private organizationService: OrganizationGateway,
    )  {

    }
  toggleModal() : void{
    this.showModal = !this.showModal;
    this.showModal ? this.getOrganization() : null
  }

  getOrganization(){
    this.organizationService.get()
    .subscribe({
      next: (resp) =>{
        this.organizations = resp.result;
        
      },
      error: (e) =>{
        console.error(e)
      }
    }) 
  }

  public changeOrganization(selectedOrganizationId: number) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    console.log(selectedOrganizationId)
    console.log(userInfo)
    var organization = userInfo.organizationRoles.find(
      (o: any) => o.organizationId === selectedOrganizationId
    );
    if (organization == null) {
      console.error('Organization not found');
    }
    userInfo.currentOrganizationId = organization.organizationId;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.toggleModal()
  }
}
