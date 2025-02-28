import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedPresentation } from 'src/app/shared/presentation/shared.module';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';
import { AuthDataModule } from 'src/app/main/feature/auth/infrastructure/modules/authentication.data.module';

@Component({
  selector: 'app-forget-my-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedPresentation,
    FormsModule,
    AuthDataModule,
    RouterModule,
  ],
  templateUrl: './forget-my-password.component.html',
  styleUrls: ['./forget-my-password.component.scss'],
})
export class ForgetMyPasswordComponent {
  isSubmited: boolean = true;
  forgetForm = this.fb.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserGateway
  ) {}

  submit() {
    if (!this.forgetForm.valid) {
      this.forgetForm.markAllAsTouched();
      return;
    }
    const params = {
      email: this.forgetForm.controls.email.value!,
    };

    this.authService.forgetPassword(params).subscribe({
      next: (resp) => {
      },
      error: (e) => {
        this.isSubmited = false;
      },
    });
  }
}
