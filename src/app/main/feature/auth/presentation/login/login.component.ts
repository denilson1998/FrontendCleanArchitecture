import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';
import { LoginModel } from 'src/app/main/feature/auth/infrastructure/models/login.model';
import { AuthService } from 'src/app/main/feature/auth/infrastructure/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserGateway
  ) {}

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let login: LoginModel = {
      username: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!,
    };
    this.authService
      .login(login)
      .pipe(
        switchMap((user) =>
          this.authService.getUserInfo().pipe(map((resp) => ({ user })))
        )
      )
      .subscribe({
        next: (resp) => {
          this.router.navigateByUrl('/products/lista');
        },
        error: (e) => {
          console.error(e);
        },
      });
  }
}
