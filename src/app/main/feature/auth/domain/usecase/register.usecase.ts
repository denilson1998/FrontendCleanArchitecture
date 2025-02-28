import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/main/feature/auth/infrastructure/models/login.model';
import { RegisterModel } from 'src/app/main/feature/auth/infrastructure/models/register.model';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { RegisterUserEntity } from 'src/app/main/feature/auth/domain/entities/register-user.entity';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';

export class RegisterUseCase
  implements UseCase<RegisterModel, RegisterUserEntity>
{
  constructor(private authRepository: UserGateway) {}
  execute(params: RegisterModel): Observable<RegisterUserEntity> {
    return this.authRepository.register(params);
  }
}
