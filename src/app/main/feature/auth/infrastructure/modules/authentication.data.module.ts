import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserGateway } from '../../domain/gateways/user.gateway';
import { LoginUseCase } from '../../domain/usecase/login.usecase';
import { RegisterUseCase } from 'src/app/main/feature/auth/domain/usecase/register.usecase';
import { ResetPasswordUseCase } from 'src/app/main/feature/auth/domain/usecase/reset-password.usecase';
import { AuthService } from '../services/authentication.service';

const loginUseCaseFactory = (loginRepo: UserGateway) =>
  new LoginUseCase(loginRepo);

export const loginUseCaseProvider = {
  provide: LoginUseCase,
  useFactory: loginUseCaseFactory,
  deps: [UserGateway],
};

export const registerUseCaseFactory = {
  provide: RegisterUseCase,
  useFactory: loginUseCaseFactory,
  deps: [UserGateway],
};

export const forgetPasswordUseCaseFactory = {
  provide: ResetPasswordUseCase,
  useFactory: loginUseCaseFactory,
  deps: [UserGateway],
};

@NgModule({
  providers: [
    loginUseCaseProvider,
    {
      provide: UserGateway,
      useClass: AuthService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class AuthDataModule {}
