import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrganizationDataModule } from '../../infrastructure/modules/organization.data.module';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { Router } from '@angular/router';
import { OrganizationGateway } from '../../domain/gateways/organization.gateway';
import { OrganizationModel } from '../../infrastructure/models/organization.model';
import { environment } from 'src/environments/environment';
import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { ImageUpload } from 'src/app/shared/presentation/helpers/utils/image-upload';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageCropperModule, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { JichiImageCropperComponent } from 'src/app/shared/presentation/components/image-cropper/image-cropper.component';
@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OrganizationDataModule,
    SharedPresentation,
    AtomModule,
    MoleculesModule,
    JichiImageCropperComponent
  ],
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent {
  newOrganizationForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: [0, Validators.required],
    address: [''],
    imageFile: [''],
    businessSector: [''],
    facebookUrl: [''],
    instagramUrl: [''],
    currency: [''],
  });

  selectedSectors: string[] = [];
  currencyOptions = environment.currency;
  isEdit = false;
  title = 'Agregar Organización';
  currentOrganization!: OrganizationEntity;
  imageChangedEvent: any = '';
  image: string =  ''
  showModal: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private organizationService: OrganizationGateway
  ) {}


  submitForm() {
    if (!this.newOrganizationForm.valid) {
      this.newOrganizationForm.markAllAsTouched();
      return;
    }
    let newOrganization: OrganizationModel = {
      name: this.newOrganizationForm.value.name!,
      phoneNumber: this.newOrganizationForm.value.phoneNumber!,
      address: this.newOrganizationForm.value.address!,
      businessSectors: this.selectedSectors,
      facebookUrl: this.newOrganizationForm.value.facebookUrl!,
      instagramUrl: this.newOrganizationForm.value.instagramUrl!,
      currency: this.newOrganizationForm.value.currency!,
      imageUri: null!,
    };
      this.organizationService.add(newOrganization).subscribe({
        next: (resp) => {
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.error(e);
        },
      });
    
  }

  goToCatalogue() {
    let userInfo = JSON.parse(localStorage.getItem('UserInfo')!);
    window.open(
      `${environment.jichiCatalogo}/${this.currentOrganization.organizationCode}/catalogo`,
      '_blank'
    );
  }

  addSector(value: string) {
    if(value!== ''){
      const newSector = this.newOrganizationForm.controls.businessSector.value!;
      this.selectedSectors.push(newSector);
      this.newOrganizationForm.controls.businessSector.setValue('');
    }

  }

  uploadImage(event: Event){
    ImageUpload.upload(event).then((res) => {
    })
  }


  
  fileChangeEvent(event: any): void {
    this.showModal = true;
    this.imageChangedEvent = event;
  }


  resetImage(event:any){
    if(event){
      this.image = event
    }
    this.imageChangedEvent.target.value = ''
    this.showModal = false
  }


}
