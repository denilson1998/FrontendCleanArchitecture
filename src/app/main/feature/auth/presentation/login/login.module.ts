import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { AuthDataModule } from 'src/app/main/feature/auth/infrastructure/modules/authentication.data.module';
import { LoginComponent } from './login.component';
import { authInterceptorProviders } from 'src/app/shared/infrastructure/interceptors/auth.interceptor';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        SharedPresentation,
        FormsModule,
        AuthDataModule,
        RouterModule
    ],
    providers: [authInterceptorProviders]

})
export class LoginModule {}
