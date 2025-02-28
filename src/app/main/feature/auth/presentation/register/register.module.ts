import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { AuthDataModule } from 'src/app/main/feature/auth/infrastructure/modules/authentication.data.module';
import { RegisterComponent } from './register.component';
import { AtomModule, MoleculesModule } from '@sitec/sarao';


@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        SharedPresentation,
        ReactiveFormsModule,
        FormsModule,
        AuthDataModule,
        RouterModule,
        MoleculesModule, 
        AtomModule
    ]

})
export class RegisterModule {}
