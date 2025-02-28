import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/main/feature/auth/infrastructure/models/login.model';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { LoginResult } from '../entities/login.entity';
import { UserGateway } from '../gateways/user.gateway';

export class LoginUseCase implements UseCase<LoginModel, LoginResult> {
  constructor(private authRepository: UserGateway) {}
  execute(params: LoginModel): Observable<LoginResult> {
    return this.authRepository.login(params);
  }
}
