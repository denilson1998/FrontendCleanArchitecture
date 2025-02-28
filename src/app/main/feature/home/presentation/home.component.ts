import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  LocalStorageLoadOptions,
  LocalStorageSaveOptions,
} from 'src/app/shared/domain/entities/local-storage-options';
import { MenuOption } from 'src/app/shared/domain/entities/menu-options';
import { CacheService } from 'src/app/shared/infrastructure/services/cache.service';
import { UserEntity } from '../../auth/domain/entities/user.entity';
import { OrganizationGateway } from '../../organization/domain/gateways/organization.gateway';
import data from '../presentation/helpers/constans/menu.json';
@Component({
  selector: 'main-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  storage: LocalStorageSaveOptions = {} as LocalStorageSaveOptions;
  readStorage: LocalStorageLoadOptions = {} as LocalStorageLoadOptions;
  nameOrganization: string = 'Cargando...';
  imgUri: string = 'assets/icons/default.png';
  userName: string = 'Cargando...';
  gap: number = 2;
  infoUser?: UserEntity = {} as UserEntity;
  options: MenuOption[] = data;
  bottomOption: MenuOption = {
    option: 'Configuración',
    icon: 'settings'
  };
  @ViewChild('content') content!: ElementRef;
  constructor(
    private organizationService: OrganizationGateway,
    private cacheService: CacheService
  ) {
    this.readStorage = {
      key: 'userInfo',
      ignoreExpiration: false,
      isObject: false,
    };
    this.infoUser = this.cacheService.loadJsonString(this.readStorage);
  }

  ngOnInit(): void {
    this.getCurrentOrganization();
  }

  onActivate() {
    this.content?.nativeElement.scrollTo(0, 0); // how far to scroll on each step
  }

  getCurrentOrganization() {
    this.organizationService.getCurrentOrganization().subscribe({
      next: (resp) => {
        this.userName = `${this.infoUser?.firstName} ${this.infoUser?.firstLastName}`;
        this.nameOrganization = resp.name;
        this.imgUri = resp.imageUri == null ? this.imgUri : resp.imageUri;
        this.storage = {
          key: 'organization',
          data: JSON.stringify(resp),
        };
        this.cacheService.save(this.storage);
      },
    });
  }
}
