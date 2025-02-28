import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';

export class ResetPasswordUseCase implements UseCase<any, any> {
  constructor(private authRepository: UserGateway) {}
  execute(params: any): Observable<any> {
    return this.authRepository.forgetPassword(params);
  }
}
