import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, pipe, switchMap } from 'rxjs';
import { JWT2JSONUtil } from 'src/app/shared/presentation/helpers/jwt2json.utils';
import passwordValidator from 'src/app/shared/presentation/helpers/validators/password.validator';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';
import { RegisterModel } from 'src/app/main/feature/auth/infrastructure/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    firstName: [null, Validators.required],
    firstLastName: [null, Validators.required],
    secondLastName: [null, Validators.required],
    phoneNumber: [
      null,
      [Validators.required, Validators.pattern('[- +()0-9]+')],
    ],
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: [null, [Validators.required, passwordValidator.policyStrength()]],
    confirmPassword: [null, [Validators.required, ]],
    privacy: [false, [Validators.requiredTrue]]
  },
  {
    validators: passwordValidator.match('password','confirmPassword')
  });

  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserGateway,
  ) {}

  register() {
    debugger
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
   
    let newUser: RegisterModel = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      firstName: this.registerForm.value.firstName!,
      firstLastName: this.registerForm.value.firstLastName!,
      secondLastName: this.registerForm.value.secondLastName!,
      phoneNumber: this.registerForm.value.phoneNumber!,
    };
    this.authService
      .register(newUser)
      .pipe(
        switchMap((user) =>
          this.authService.getUserInfo().pipe(map((resp) => ({ user })))
        )
      )
      .subscribe({
        next: (resp) => {
          this.router.navigateByUrl('/organization');
        },
        error: (e) => {
          console.error(e);
        },
      });
  }

  
}
