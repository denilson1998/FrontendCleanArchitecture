import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OrganizationFormComponent } from '../../organization/presentation/organization-form/organization-form.component';
import { AuthComponent } from './auth.component';
import { ForgetMyPasswordComponent } from './forget-my-password/forget-my-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BenefitsComponent } from './benefits/benefits.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: 
    [
      { 
        path: 'login', 
        component: LoginComponent
      },
      { 
        path: 'register', 
        component: RegisterComponent, 
      },
      {
        path: 'passwordReset',
        component: ForgetMyPasswordComponent,
      },

      {
        path: 'organization',
        component: OrganizationFormComponent,
      },
      {
        path: 'benefits',
        component: BenefitsComponent
      }

    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
