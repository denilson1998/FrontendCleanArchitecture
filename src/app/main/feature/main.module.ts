import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LoginModule } from './auth/presentation/login/login.module';
import { RegisterModule } from './auth/presentation/register/register.module';
import { ForgetMyPasswordComponent } from './auth/presentation/forget-my-password/forget-my-password.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/domain/guard/auth.guard';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    LoginModule,
    RegisterModule,
    ForgetMyPasswordComponent,
    RouterModule
  ],
  providers: [AuthGuard],
})
export class MainModule {}
