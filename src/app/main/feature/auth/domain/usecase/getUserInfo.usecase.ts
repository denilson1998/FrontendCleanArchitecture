import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserEntity } from '../entities/user.entity';
import { UserGateway } from '../gateways/user.gateway';

export class getUserInfoUseCase implements UseCase<void, UserEntity> {
  constructor(private authRepository: UserGateway) {}
  execute(): Observable<UserEntity> {
    return this.authRepository.getUserInfo();
  }
}
