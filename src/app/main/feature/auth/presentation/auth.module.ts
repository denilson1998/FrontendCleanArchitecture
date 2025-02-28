import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BenefitsComponent } from './benefits/benefits.component';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        LoginModule,
        RegisterModule,
        RouterModule,
        
        ],
    exports: [AuthRoutingModule],

})
export class AuthModule {}
