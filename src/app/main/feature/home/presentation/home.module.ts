import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'src/app/shared/presentation/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/presentation/components/header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { OrganizationFormComponent } from 'src/app/main/feature/organization/presentation/organization-form/organization-form.component';
import { ModalOrganizationComponent } from 'src/app/shared/presentation/components/modals/modal-organization/modal-organization.component';
import { HomeComponent } from './home.component';
import { ModalPrintComponent } from 'src/app/shared/presentation/components/modals/modal-print/modal-print.component';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { MoleculesModule } from '@sitec/sarao';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { authInterceptorProviders } from 'src/app/shared/infrastructure/interceptors/auth.interceptor';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    OrganizationFormComponent,
    ModalOrganizationComponent,
    ModalPrintComponent,
    RouterModule,
    SectionTitleComponent,
    HomeRoutingModule,
    MoleculesModule
  ],
  providers: [authInterceptorProviders, ApiService],
  exports: [HomeRoutingModule],
})
export class HomeModule {}
