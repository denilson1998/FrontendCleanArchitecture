import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';

export class RemoveUserUseCase
  implements UseCase<number, void> {

  constructor(private userRepository: UserGateway) {}

  execute(userId: number): Observable<void> {
    return this.userRepository.remove(userId);
  }
}
